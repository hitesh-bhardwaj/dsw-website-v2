import React from "react";
import { Body, Container, Head, Hr, Html, Img, Preview, Text } from "@react-email/components";

const WalkthroughAutoResponse = ({ userName, downloadedPdfName }) => {
  return (
    <Html>
      <Head />
      <Preview>
       Thank you for taking the UnifyAI Product Walkthrough!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={"https://www.datasciencewizards.ai/assets/form-logo.png"}
            width="140"
            height="80"
            alt="DSW Logo"
            style={logo}
          />
          <Text style={greeting}>Hi {userName},</Text>
          
          
            <>
              <Text style={paragraph}>
               Thank you for your interest in DSW UnifyAI! Hope you enjoyed the lightning quick walkthrough of our platform. 
              </Text>
              <Text style={paragraph}>
                UnifyAI is designed to accelerate your AI/ML use cases from scratch to production in 3 - 4 weeks and GenAI use cases in just 2-4 hours! It is purpose-built to help you achieve scalable AI-driven transformation in record time, with full efficiency and compliance.
              </Text>
            </>
          
            <>
              <Text style={paragraph}>
                Want to take the next step? Book a live demo with us to discover how UnifyAI can address your specific needs and accelerate your AI journey.
              </Text>
              <Text style={paragraph}>
               <strong>Schedule A Demo With Me </strong> - <a href="https://calendly.com/rohit-rajgor-dsw/dsw-ai-demo?month=2025-12">Click Here</a>
              </Text>
            </>
         
          
          <Text style={paragraph}>
           We’re excited to show you what’s possible with UnifyAI! 
          </Text>
          
          <Text style={paragraph}>
            Best regards,
            <br />
           Rohit Rajgor <br/>
Vice President - Sales and Business Strategy <br/>
+91-9664056847 | www.datasciencewizards.ai 
          </Text>
          <Img
            src={"https://www.datasciencewizards.ai/wp-content/uploads/2025/01/email-signature-rohit.png"}
            width="140"
            height="80"
            alt="Signature Banner"
            style="width: 100%; height: auto; display: block;"
          />
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

export default WalkthroughAutoResponse;

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