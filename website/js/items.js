$(function () {
    callGetAPI();
});

var _authTokenPromise = new Promise(function fetchCurrentAuthToken(resolve, reject) {
    var userPool;
    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };
    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
        cognitoUser.getSession(function sessionCallback(err, session) {
            if (err) {
                reject(err);
            } else if (!session.isValid()) {
                resolve(null);
            } else {
                resolve(session.getIdToken().getJwtToken());
            }
        });
    } else {
        resolve(null);
    }
});

function callPostAPI(text) {
    _authTokenPromise.then(function setAuthToken(token) {
        var authToken = token;
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/ride',
            headers: {
                'Authorization': authToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                Text: text
            }),
            success: function onRequestSuccess(result) {
                console.log('Request succedeed' + result);
            },
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Response: ', jqXHR.responseText);
            }
        });
    }).catch(function handleTokenError(error) {
    });
}

function callGetAPI() {
    _authTokenPromise.then(function setAuthToken(token) {
        var authToken = token;
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/ride',
            headers: {
                'Authorization': authToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function onRequestSuccess(result) {
                result.Items.forEach((i) => {
                    $("#itemsContainer").append("<div><p>" + i.Time.S + "</p><p>" + i.Text.S + "</p></div>");
                });
            },
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Response: ', jqXHR.responseText);
            }
        });
    }).catch(function handleTokenError(error) {
    });
}
