<?php
$versionHash = md5(config('app.version'));
?><!DOCTYPE html>
<html lang="de">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Unser Familienbetrieb befindet sich in Schrattenthal, der kleinsten Weinstadt im Weinviertel. Der Weinbau hat bei uns Tradition, und unsere Wurzeln reichen bis in das Jahr 1836 zurück.">
		<meta name="author" content="Winzerhof Wurst, Schrattenthal, Österreich">
		<title>Winzerhof Wurst</title>
	</head>
	<body id="app">
		<input type="hidden" 
			   id="csrf-token"
			   value="<?php echo csrf_token(); ?>">
		<div id="overlay">
			<div id="loader-container">
				<div class="loader">Lade</div>
			</div>
		</div>
		<div id="content"></div>

		<script src="assets/wiwu.min.js?v=<?php echo $versionHash; ?>"></script>
		<link href="css/wiwu.css?v=<?php echo $versionHash; ?>" rel="stylesheet">
		<script>
			@yield('script')
		</script>

		<!-- Piwik -->
		<script type="text/javascript">
				var _paq = _paq || [];
			_paq.push(['trackPageView']);
			_paq.push(['enableLinkTracking']);
			// accurately measure the time spent on the last pageview of a visit
			_paq.push(['enableHeartBeatTimer']);
			(function() {
				var u = "https://piwik.wuc.me/";
				_paq.push(['setTrackerUrl', u + 'piwik.php']);
				_paq.push(['setSiteId', '2']);
				var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
				g.type = 'text/javascript';
				g.async = true;
				g.defer = true;
				g.src = u + 'piwik.js';
				s.parentNode.insertBefore(g, s);
			})();
		</script>
		<noscript>
		<p>
			<img src="https://piwik.wuc.me/piwik.php?idsite=2" style="border:0;" alt="" />
		</p>
		</noscript>
		<!-- End Piwik Code -->
	</body>
</html>
