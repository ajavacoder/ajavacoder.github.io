<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>Login page</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-theme.css">
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" 
        aria-labelledby="myModalLabel" aria-hidden="true"
        style="display: none;">
        <div class="modal-dialog">
            <div class="loginmodal-container">
                <h1>Please log in</h1>
                <br>
                <form action="login" method=POST>
                    <div style="margin-bottom: 25px" class="input-group">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                        <input id="login-password" type="text" class="form-control" name="username" placeholder="">
                    </div>
                    <div style="margin-bottom: 25px" class="input-group">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                        <input id="login-password" type="password" class="form-control" name="password" placeholder="">
                    </div>
                    <input type="submit" class="login loginmodal-submit">
                </form>
            </div>
        </div>
    </div>
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        $("#login-modal").modal();
    })
    </script>
</body>
</html>