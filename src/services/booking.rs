use std::env;

use chrono::NaiveDate;
use failure::Error;
use lettre::Transport;
use lettre_email::EmailBuilder;
use log::{info};

use crate::services::email::get_mailer;

#[derive(Deserialize)]
pub struct BookingRequest {
    date: NaiveDate,
    stays: i32,
    persons: i32,
    rooms: i32,
    firstname: String,
    lastname: String,
    telephone: String,
    email: String,
}

pub fn save_booking_request(request: &BookingRequest) -> Result<(), Error> {
    info!("Received booking request");
    let mut mailer = get_mailer()?;
    info!("Got mailer");
    let email = EmailBuilder::new()
        .to(request.email.as_ref())
        .from(env::var("MAIL_FROM").unwrap_or("noreply@winzerhof-wurst.at".to_owned()))
        .bcc(env::var("MAIL_BCC").unwrap_or("office@winzerhof-wurst.at".to_owned()))
        .subject("Bestätigung Ihrer Zimmeranfrage auf www.winzerhof-wurst.at")
        .html(format!(
            "<h1>Ihre Zimmeranfrage auf www.winzerhof-wurst.at</h1>

<h2>Name und Anschrift:</h2>
{} {}<br>

Tel: {}<br>
Email: {}<br>

<h2>Anfragedetails:</h2>
<ul>
	<li>Datum: {}, {} Übernächtigungen</li>
	<li>{} Personen</li>
	<li>{} Zimmer</li>
</ul>",
            request.firstname,
            request.lastname,
            request.telephone,
            request.email,
            request.date,
            request.stays,
            request.persons,
            request.rooms,
        ))
        .build()?;
    info!("Message build");
    mailer.send(email.into())?;
    info!("Message sent");

    Ok(())
}
