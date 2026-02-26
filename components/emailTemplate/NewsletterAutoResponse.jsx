import React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";

const NewsletterAutoResponse = ({ userName = "there" }) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the DSW Newsletter - you’re subscribed 🎉</Preview>

      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.datasciencewizards.ai/assets/form-logo.png"
            width="140"
            height="80"
            alt="DSW Logo"
            style={logo}
          />

          <Text style={greeting}>Hi {userName},</Text>

          <Text style={paragraph}>
            Thanks for subscribing to the <strong>DSW Newsletter</strong> - you’re officially on the list.
          </Text>

          <Text style={paragraph}>
            You’ll receive product updates, insights, and helpful tips from our team. We’ll keep it relevant and
            you can unsubscribe anytime.
          </Text>

          <Text style={paragraph}>
            To make sure you don’t miss an email, please add us to your safe sender list.
          </Text>

          <Text style={paragraph}>
            Best regards,
            <br />
            Team DSW
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            This is an automated message. Please do not reply to this email.
          </Text>
          <Text style={footer}>Data Science Wizards</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterAutoResponse;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const logo = {
  margin: "0 auto 30px",
  display: "block",
};

const greeting = {
  fontSize: "18px",
  lineHeight: "26px",
  fontWeight: "600",
  marginBottom: "20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "16px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "30px 0 20px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "18px",
  marginTop: "8px",
};
