<h1>Ihre Zimmeranfrage auf www.winzerhof-wurst.at</h1>

<h2>Name und Anschrift:</h2>
{{ $data['firstname'] }} {{ $data['lastname'] }}<br>

Tel: {{ $data['telephone'] }}<br>
Email: {{ $data['email'] }}<br>

<h2>Anfragedetails:</h2>
<ul>
	<li>Datum: {{ $data['date'] }}, {{ $data['stays'] }} Übernächtigungen</li>
	<li>{{ $data['persons'] }} Personen</li>
	<li>{{ $data['rooms'] }} Zimmer</li>
</ul>
