// components/emailTemplate/DemoDetails.jsx
import React from "react";
import {
  Body, Column, Container, Head, Hr, Html, Img, Link,
  Preview, Row, Section, Text
} from "@react-email/components";

const DemoDetails = ({
  userName,
  userEmail,
  userDesignation,
  userCompany,
  userNumber,
  pageUrl,
}) => {
  return (
    <Html>
      <Head />
      <Preview>New demo request from {userName} at {userCompany}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.datasciencewizards.ai/assets/form-logo.png"
            width="140"
            height="80"
            alt="DSW Logo"
            style={logo}
          />
          <Text style={paragraph}>Hi Team,</Text>
          <Text style={paragraph}>
            You have received a new demo request. Please find the details below:
          </Text>

          <Section>
            <Row style={row}>
              <Column style={columnHead}>Name</Column>
              <Column style={columnText}>{userName}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnHead}>Email</Column>
              <Column style={{ ...columnText, textDecoration: "underline", color: "#067df7" }}>
                {userEmail}
              </Column>
            </Row>
            <Row style={row}>
              <Column style={columnHead}>Designation</Column>
              <Column style={columnText}>{userDesignation}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnHead}>Company</Column>
              <Column style={columnText}>{userCompany}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnHead}>Phone Number</Column>
              <Column style={columnText}>{userNumber}</Column>
            </Row>
          </Section>

          <Text style={paragraph}>
            Please reach out to them within 24-48 hours.
          </Text>

          <Text style={paragraph}>Thanks,</Text>
          <Text style={paragraph}>Admin</Text>
          <Hr style={hr} />
          <Text style={footer}>This form is submitted from the page - <Link href={pageUrl}>{pageUrl}</Link></Text>
          <Text style={footer}>Data Science Wizards | India</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default DemoDetails;

const main = { 
  backgroundColor: "#ffffff", 
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif' 
};
const container = { margin: "0 auto", padding: "20px 0 48px", maxWidth: "580px" };
const logo = { margin: "0 auto 30px", display: "block" };
const paragraph = { fontSize: "16px", lineHeight: "26px", marginBottom: "16px" };
const row = { 
  borderLeft: "1px solid #f2f2f2", 
  borderRight: "1px solid #f2f2f2", 
  borderTop: "1px solid #f2f2f2" 
};
const columnHead = { 
  textAlign: "left", 
  fontSize: "16px", 
  lineHeight: "26px", 
  fontWeight: "600", 
  width: "140px", 
  padding: "12px 16px", 
  borderRight: "1px solid #f2f2f2",
  backgroundColor: "#f9f9f9"
};
const columnText = { 
  textAlign: "left", 
  fontSize: "15px", 
  lineHeight: "26px", 
  padding: "12px 16px", 
  color: "#333333" 
};
const hr = { borderColor: "#cccccc", margin: "30px 0 20px" };
const footer = { color: "#8898aa", fontSize: "12px", marginTop: "8px" };