import React from "react";
import { Body, Column, Container, Head, Html, Img, Link, Preview, Row, Section, Text, Hr } from "@react-email/components";

const ContactDetails = ({ userName, userEmail, userDesignation, userCompany, userNumber, userReason, userMessage, pageUrl }) => {
  const data = [
    { label: "Name", value: userName },
    { label: "Email", value: userEmail, isEmail: true },
    { label: "Designation", value: userDesignation },
    { label: "Company", value: userCompany },
    { label: "Number", value: userNumber },
    { label: "Reason", value: userReason },
    { label: "Message", value: userMessage },
  ];

  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission - DSW</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ textAlign: "center", marginBottom: "20px" }}>
            <Img
              src="https://www.datasciencewizards.ai/assets/form-logo.png"
              width="140"
              height="80"
              alt="Logo"
              style={{ margin: "0 auto" }}
            />
          </Section>

          <Text style={paragraph}>Hi Team,</Text>
          <Text style={paragraph}>You have a new contact form submission. Below are the details.</Text>

          {/* SINGLE TABLE STRUCTURE */}
          <Section style={mainTable}>
            {data.map((item, index) => (
              <Row key={index}>
                <Column style={labelCell}>
                  <Text style={labelTextStyle}>{item.label}</Text>
                </Column>
                <Column style={valueCell}>
                  {item.isEmail ? (
                    <Link href={`mailto:${item.value}`} style={linkStyle}>{item.value}</Link>
                  ) : (
                    <Text style={valueTextStyle}>{item.value}</Text>
                  )}
                </Column>
              </Row>
            ))}
          </Section>

          <Text style={paragraph}>- Team DSW</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Submitted from: <br />
            <Link href={pageUrl} style={linkStyle}>{pageUrl}</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactDetails;

// --- STYLES ---

const main = {
  backgroundColor: "#ffffff",
  fontFamily: 'Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px",
  width: "580px",
};

const mainTable = {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",
  border: "1px solid #eeeeee", // This creates the outer box
};

const labelCell = {
  width: "150px",
  backgroundColor: "#f9f9f9",
  padding: "12px",
  borderBottom: "1px solid #eeeeee",
  borderRight: "1px solid #eeeeee",
  verticalAlign: "middle",
};

const valueCell = {
  width: "430px",
  padding: "12px",
  borderBottom: "1px solid #eeeeee",
  verticalAlign: "middle",
  wordBreak: "break-word",
};

const labelTextStyle = {
  margin: "0",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#333333",
};

const valueTextStyle = {
  margin: "0",
  fontSize: "14px",
  color: "#555555",
  lineHeight: "1.4",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333",
};

const linkStyle = {
  color: "#067df7",
  textDecoration: "none",
  fontSize: "14px",
};

const hr = { borderColor: "#e6ebf1", margin: "20px 0" };
const footer = { color: "#8898aa", fontSize: "12px" };