<!DOCTYPE html>
<head>
<meta charset="UTF-8">
<title>Login page</title>
<link rel="stylesheet" href="css/login.css">
</head>
<body>
	<%
    if (request.getRemoteUser() != null) {
%>
	<hgroup>
		<h1>
			Hello
			<%=request.getRemoteUser()%>!
		</h1>
	</hgroup>
	<form action="logout" method=GET>
		<input type="submit" class="button buttonBlue" value="Logout"
			style="border-radius: 3px;">
	</form>
	<%
    } else {
        if (request.getParameter("error") != null) {
            out.println("<hgroup><h1 class=\"text-danger\">Wrong user/password...</h1></hgroup>");
        } else if (request.getParameter("logout") != null) {
            out.println("<hgroup><h1 class=\"text-success\">Logged out succesfully!</h1></hgroup>");
        } else {        
            out.println("<hgroup><h1 class=\"text-default\">Please sign in.</h1></hgroup>");
        }
%>
	<form action="login" method=POST>
		<div class="group">
			<input type="text" name="username"><span class="highlight"></span><span
				class="bar"></span> <label>Name</label>
		</div>
		<div class="group">
			<input type="password" name="password"><span
				class="highlight"></span><span class="bar"></span> <label>Password</label>
		</div>
		<button type="submit" class="button buttonBlue">
			Login
			<div class="ripples buttonRipples">
				<span class="ripplesCircle"></span>
			</div>
		</button>
	</form>
	<%}%>
	<script type="text/javascript" src="js/lib/jquery.js"></script>
	<script type="text/javascript" src="js/login.js"></script>
</body>
</html>