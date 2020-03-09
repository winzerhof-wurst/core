use std::env;

use failure::Error;
use lettre::smtp::client::net::ClientTlsParameters;
use lettre::smtp::{authentication, ClientSecurity, SmtpTransport};
use lettre::SmtpClient;
use native_tls::{Protocol, TlsConnector};

pub fn get_mailer() -> Result<SmtpTransport, Error> {
    let domain = "smtp.world4you.com";
    let user = env::var("MAIL_USER")?;
    let pwd = env::var("MAIL_PASSWORD")?;

    let creds = authentication::Credentials::new(user, pwd);

    let mut tls_builder = TlsConnector::builder();
    tls_builder.min_protocol_version(Some(Protocol::Tlsv12));

    let tls_parameters = ClientTlsParameters::new(domain.to_string(), tls_builder.build()?);
    Ok(
        SmtpClient::new((domain, 587), ClientSecurity::Required(tls_parameters))?
            .authentication_mechanism(authentication::Mechanism::Login)
            .credentials(creds)
            .transport(),
    )
}
