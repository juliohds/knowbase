/* 
 Filter requests.

 Installation
    1 - Add this file to your App_Code folder;

    2 - Add this in your web.config under <system.webServer>:
    
        <modules>
            ...other modules
            <add type="RequestFilterModule" name="RequestFilterModule" />
        </modules>

    3 - Add the parameters* to you AppSettings our familiar tools, example:

            PATH_RESERVED_CHARACTERS: =!*();:@+$,?\%#[]&quot;&apos;&lt;&gt;
            QUERY_STRING_RESERVED_CHARACTERS: !*();:?@+$,\%#[]&quot;&apos;&lt;&gt;

    4 - Run your project.

*= CTRL+F 'parameter' and you will find all of them

*/



using System;
using System.Web;


public class RequestFilterModule : IHttpModule
{
    void IHttpModule.Dispose()
    {
        // Nothing to dispose; 
    }

    void IHttpModule.Init(HttpApplication context)
    {
        context.BeginRequest += new EventHandler(context_BeginRequest);
    }


    private void context_BeginRequest(object sender, EventArgs e)
    {
        var pathInvalid = false;
        var queryInvalid = false;

        var context = HttpContext.Current;

                                        /* parameter */
        var pathReservedCharacters = AppSettings.ObterValor<string>("PATH_RESERVED_CHARACTERS");

        pathInvalid = HasReservedCharacters(context.Request.Path, pathReservedCharacters);


        var queryString = context.Request.QueryString;

        if (queryString.Count > 0)
        {                                   /* parameter */
            var queryReservedCharacters = AppSettings.ObterValor<string>("QUERY_STRING_RESERVED_CHARACTERS");

            foreach (string key in queryString)
            {
                if (HasReservedCharacters(queryString[key], queryReservedCharacters))
                {
                    queryInvalid = true;
                    break;
                }
            }

        }

        if (pathInvalid || queryInvalid)
        {
            context.Response.StatusCode = 403;
            context.Response.End();
        }

        return;
    }


    public static bool HasReservedCharacters(string value, string reservedCharacters)
    {
        if (String.IsNullOrEmpty(value)) return false;

        foreach (char @char in value)
        {
            if (reservedCharacters.IndexOf(@char) != -1)
            {
                return true;
            }
        }

        return false;
    }

}
