<h1>Ihre Bestellung auf www.winzerhof-wurst.at</h1>

<h2>Name und Anschrift:</h2>
{{ $data['firstname'] }} {{ $data['lastname'] }}<br>
{{ $data['street'] }} {{ $data['nr'] }}<br>
{{ $data['zipcode'] }} {{ $data['city'] }}<br>

Tel: {{ $data['telephone'] }}<br>
Fax: {{ $data['fax'] }}<br>
Email: {{ $data['email'] }}<br>

<h2>Anmerkungen:</h2>
<p>
	{{ $data['comment'] }}
</p>

<h2>Bestelldetails:</h2>
<ul>
	@foreach ($items as $item)
	<li>{{ $item->qty }}x {{ $item->name }} – &euro;{{ $item->price }}/Stk</li>
	@endforeach
</ul>
