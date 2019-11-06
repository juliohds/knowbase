/* 
 Block the response to attacking IP addresses.

 Installation
    1 - Add this file to your App_Code folder;

    2 - Add this in your web.config under <system.webServer>:

        <modules>
            ...other modules
            <add type="DdosAttackModule" name="DdosAttackModule" />
        </modules>

    3 - Add the parameters* to you AppSettings our familiar tools, example:
    
            MOCK_IP: 00.0.00.00
            MAX_REQUESTS_PER_INTERVAL: 500
            INTERVAL_IN_SECS: 1
            BLOCK_RELEASE_INTERVAL_IN_MINS: 10 

    4 - Run your project.

*= CTRL+F 'parameter' and you will find all of them

*/

#region Using

using System;
using System.Web;
using System.Timers;
using System.Reflection;
using System.Collections.Generic;

#endregion

public class DdosAttackModule : IHttpModule
{

    #region IHttpModule Members

    void IHttpModule.Dispose()
    {
        // Nothing to dispose; 
    }

    void IHttpModule.Init(HttpApplication context)
    {
        context.BeginRequest += new EventHandler(context_BeginRequest);
    }

    #endregion

    #region Private fields

    private static Dictionary<string, short> _IpAdresses = new Dictionary<string, short>();
    private static Stack<string> _Banned = new Stack<string>();
    private static Timer _Timer = CreateTimer();
    private static Timer _BannedTimer = CreateBanningTimer();
    private static LogTracker _logTracker = new LogTracker(typeof(DdosAttackModule));

    #endregion


    private void SetMockApi(object sender, EventArgs e)
    {
        HttpApplication application = (HttpApplication) sender;
        BindingFlags temp = BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Static;

        MethodInfo addStatic = null;
        MethodInfo makeReadOnly = null;
        MethodInfo makeReadWrite = null;

        Type type = application.Request.ServerVariables.GetType();
        MethodInfo[] methods = type.GetMethods(temp);
        foreach (MethodInfo method in methods)
        {
            switch (method.Name)
            {
                case "MakeReadWrite":
                    makeReadWrite = method;
                    break;
                case "MakeReadOnly":
                    makeReadOnly = method;
                    break;
                case "AddStatic":
                    addStatic = method;
                    break;
            }
        }

        makeReadWrite.Invoke(application.Request.ServerVariables, null);

        string[] values = {         /* parameter */
            "HTTP_X_FORWARDED_FOR", AppSettings.ObterValor<string>("MOCK_IP") 
        }; 

        addStatic.Invoke(application.Request.ServerVariables, values);
        makeReadOnly.Invoke(application.Request.ServerVariables, null);
    }


    private void context_BeginRequest(object sender, EventArgs e)
    {
        // Remove this, and the SetMockApi method, if your development needs do not require mocks.
        #if DEBUG
            SetMockApi(sender, e);
        #endif

        // Replace this to retrive from where your server sends
        string ip = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"]; 

        if (string.IsNullOrEmpty(ip) || _Banned.Contains(ip))
        {
            HttpContext.Current.Response.StatusCode = 403;
            HttpContext.Current.Response.End();
        }

        CheckIpAddress(ip);
    }

    /// <summary>
    /// Checks the requesting IP address in the collection
    /// and bannes the IP if required.
    /// </summary>
    private static void CheckIpAddress(string ip)
    {
        try
        {                                   /* parameter */
            int MAX_REQUESTS_PER_INTERVAL = AppSettings.ObterValor<int>("MAX_REQUESTS_PER_INTERVAL"); 

            if (!_IpAdresses.ContainsKey(ip))
            {
                _IpAdresses[ip] = 1;
            }
            else if (_IpAdresses[ip] == MAX_REQUESTS_PER_INTERVAL)
            {
                _Banned.Push(ip);
                _IpAdresses.Remove(ip);
            }
            else
            {
                _IpAdresses[ip]++;
            }
        }
        catch (Exception ex)
        {
            return;
        }
    }

    #region Timers

    /// <summary>
    /// Creates the timer that substract a request
    /// from the _IpAddress dictionary.
    /// </summary>
    private static Timer CreateTimer()
    {                               /* parameter */ 
        int INTERVAL_IN_MILISECS = (AppSettings.ObterValor<int>("INTERVAL_IN_SECS") * 1000); 

        Timer timer = GetTimer(INTERVAL_IN_MILISECS);

        timer.Elapsed += new ElapsedEventHandler(TimerElapsed);

        return timer;
    }

    /// <summary>
    /// Creates the timer that removes 1 banned IP address
    /// everytime the timer is elapsed.
    /// </summary>
    /// <returns></returns>
    private static Timer CreateBanningTimer()
    {                                          /* parameter */                                                         
        int BLOCK_RELEASE_INTERVAL_IN_MINS = (AppSettings.ObterValor<int>("BLOCK_RELEASE_INTERVAL_IN_MINS") * 60 * 1000); 

        Timer timer = GetTimer(BLOCK_RELEASE_INTERVAL_IN_MINS);

        timer.Elapsed += delegate { if (_Banned.Count > 0) _Banned.Pop(); };

        return timer;
    }

    /// <summary>
    /// Creates a simple timer instance and starts it.
    /// </summary>
    /// <param name="interval">The interval in milliseconds.</param>
    private static Timer GetTimer(int interval)
    {
        Timer timer = new Timer();
        timer.Interval = interval;
        timer.Start();

        return timer;
    }

    /// <summary>
    /// Substracts a request from each IP address in the collection.
    /// </summary>
    private static void TimerElapsed(object sender, ElapsedEventArgs e)
    {
        try
        {
            foreach (string key in _IpAdresses.Keys)
            {
                _IpAdresses[key]--;

                if (_IpAdresses[key] == 0) _IpAdresses.Remove(key);
            }
        }
        catch (Exception ex)
        {
            return;
        }
    }

    #endregion

}