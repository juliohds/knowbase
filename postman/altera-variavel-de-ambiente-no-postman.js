var jsonData = pm.response.json();
if (jsonData.token)
    pm.environment.set("client_token", jsonData.token);