// components/emailTemplate/DemoAutoResponse.jsx
import React from "react";
import { 
  Body, Container, Head, Hr, Html, Img, Preview, Text 
} from "@react-email/components";

const DemoAutoResponse = ({ userName }) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for requesting a demo with DSW</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.datasciencewizards.ai/assets/images/form-logo.png"
            width="140"
            height="80"
            alt="DSW Logo"
            style={logo}
          />
          <Text style={greeting}>Hi {userName},</Text>
          
          <Text style={paragraph}>
            Thank you for your interest in Data Science Wizards! We've received 
            your demo request and are excited to show you what we can do.
          </Text>
          
          <Text style={paragraph}>
            Our team will review your request and reach out to you within the 
            next <strong>24-48 hours</strong> to schedule a personalized demo 
            session at a time that works best for you.
          </Text>
          
          <Text style={paragraph}>
            In the meantime, if you have any questions or would like to share 
            specific requirements, feel free to reply to this email.
          </Text>
          
          <Text style={paragraph}>
            Best regards,
            <br />
            Team DSW
          </Text>
          
          <Hr style={hr} />
          <Text style={footer}>Data Science Wizards</Text>
          <Text style={footer}>
            This is an automated confirmation email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default DemoAutoResponse;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = { margin: "0 auto", padding: "20px 0 48px", maxWidth: "580px" };
const logo = { margin: "0 auto 30px", display: "block" };
const greeting = { 
  fontSize: "18px", 
  lineHeight: "26px", 
  fontWeight: "600", 
  marginBottom: "20px" 
};
const paragraph = { 
  fontSize: "16px", 
  lineHeight: "26px", 
  marginBottom: "16px",
  color: "#333333"
};
const hr = { borderColor: "#cccccc", margin: "30px 0 20px" };
const footer = { 
  color: "#8898aa", 
  fontSize: "12px", 
  lineHeight: "18px", 
  marginTop: "8px" 
};