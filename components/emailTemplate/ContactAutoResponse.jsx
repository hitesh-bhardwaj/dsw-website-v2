import React from "react";
import { Body, Container, Head, Hr, Html, Img, Preview, Text } from "@react-email/components";

const AutoResponse = ({ userName }) => {
  return (
    <Html>
      <Head />
      <Preview>
        Thank you for contacting DSW - We've received your message
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={"https://www.datasciencewizards.ai/assets/images/form-logo.png"}
            width="140"
            height="80"
            alt="DSW Logo"
            style={logo}
          />
          <Text style={greeting}>Hi {userName},</Text>
          <Text style={paragraph}>
            Thank you for reaching out to us! We've received your message and appreciate you taking the time to contact DSW.
          </Text>
          <Text style={paragraph}>
            Our team will review your inquiry and get back to you as soon as possible. We typically respond within 24-48 hours during business days.
          </Text>
          <Text style={paragraph}>
            If your matter is urgent, please don't hesitate to reach out to us directly.
          </Text>
          <Text style={paragraph}>
            Best regards,
            <br />
            Team DSW
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            This is an automated response. Please do not reply to this email.
          </Text>
          <Text style={footer}>Data Science Wizards</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default AutoResponse;

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