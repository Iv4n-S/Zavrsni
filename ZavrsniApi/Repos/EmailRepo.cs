using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Repos
{
    public class EmailRepo: IEmailRepo
    {
        private const string templatePath = @"EmailTemplate/BookingTemplate.html";
        private readonly SMTPConfigDto _smtpConfig;

        public EmailRepo(IOptions<SMTPConfigDto> smtpConfig)
        {
            _smtpConfig = smtpConfig.Value;
        }
        public async Task SendEmailToUser(EmailDto emailOptions)
        {
            emailOptions.Subject = UpdatePlaceHolders("Hello {{UserName}}!", emailOptions.PlaceHolders);

            emailOptions.Body = UpdatePlaceHolders(GetEmailBody("TestEmail"), emailOptions.PlaceHolders);

            await SendEmail(emailOptions);
        }


        private async Task SendEmail(EmailDto emailOptions)
        {
            MailMessage mail = new MailMessage
            {
                Subject = emailOptions.Subject,
                Body = emailOptions.Body,
                From = new MailAddress(_smtpConfig.SenderAddress, _smtpConfig.SenderDisplayName),
                IsBodyHtml = _smtpConfig.IsBodyHTML,
            };
            mail.To.Add(emailOptions.ToEmail);

            NetworkCredential networkCredential = new NetworkCredential(_smtpConfig.UserName, _smtpConfig.Password);

            SmtpClient smtpClient = new SmtpClient
            {
                Host = _smtpConfig.Host,
                Port = _smtpConfig.Port,
                EnableSsl = _smtpConfig.EnableSSL,
                UseDefaultCredentials = _smtpConfig.UseDefaultCredentials,
                Credentials = networkCredential
            };

            mail.BodyEncoding = Encoding.Default;

            await smtpClient.SendMailAsync(mail);
        }

        private string GetEmailBody(string templateName)
        {
            var body = File.ReadAllText(string.Format(templatePath));
            return body; 
        }
        private string UpdatePlaceHolders(string text, List<KeyValuePair<string, string>> keyValuePairs)
        {
            if (!string.IsNullOrEmpty(text) && keyValuePairs != null)
            {
                foreach (var placeholder in keyValuePairs)
                {
                    if (text.Contains(placeholder.Key))
                    {
                        text = text.Replace(placeholder.Key, placeholder.Value);
                    }
                }
            }

            return text;
        }


    }
}
