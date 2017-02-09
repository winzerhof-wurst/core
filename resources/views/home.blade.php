<?php

$versionHash = md5(config('app.version'));

?><!DOCTYPE html>
<html lang="de">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">
		<title>Winzerhof Wurst</title>

		<!-- css -->
		<link href="vendor/bootstrap/dist/css/bootstrap.min.css?v=<?php echo $versionHash; ?>" rel="stylesheet">
		<link href="css/wiwu.css?v=<?php echo $versionHash; ?>" rel="stylesheet">
	</head>
	<body id="app">
		<div id="overlay">
			<div id="loader-container">
				<div class="loader">Lade</div>
			</div>
		</div>
		<div id="content"></div>
		<script src="vendor/requirejs/require.js?v=<?php echo $versionHash; ?>" data-main="js/config.js?v=<?php echo $versionHash; ?>"></script>
		<script src="vendor/jquery/dist/jquery.min.js?v=<?php echo $versionHash; ?>"></script>
		<script src="vendor/bootstrap/dist/js/bootstrap.min.js?v=<?php echo $versionHash; ?>"></script>
		<script>
			$(function(){
				$.ajaxSetup({
				headers: {'X-CSRF-TOKEN': '<?php echo csrf_token(); ?>'}
				});
			});
			@yield('script')
		</script>
	</body>
</html>