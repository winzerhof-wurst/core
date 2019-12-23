use std::env;

use failure::Error;
use lettre::smtp::{authentication::Credentials, SmtpTransport};
use lettre::SmtpClient;

pub fn get_mailer() -> Result<SmtpTransport, Error> {
    let user = env::var("MAIL_USER")?;
    let pwd = env::var("MAIL_PASSWORD")?;

    let creds = Credentials::new(user, pwd);
    Ok(SmtpClient::new_simple("smtp.world4you.com")?
        .credentials(creds)
        .transport())
}
