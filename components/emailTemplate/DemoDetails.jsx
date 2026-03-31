// components/emailTemplate/DemoDetails.jsx

import React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const DemoDetails = ({
  userName,
  userEmail,
  userDesignation,
  userCompany,
  userNumber,
  pageUrl,
}) => {
  const previewText = `New demo request from ${userName} at ${userCompany}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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

          <Section style={tableWrapper}>
            <Row style={row}>
              <Column style={columnHead}>Name</Column>
              <Column style={columnText}>{userName}</Column>
            </Row>

            <Row style={row}>
              <Column style={columnHead}>Email</Column>
              <Column style={columnText}>
                <Link href={`mailto:${userEmail}`} style={link}>
                  {userEmail}
                </Link>
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

            <Row style={lastRow}>
              <Column style={columnHead}>Submitted From</Column>
              <Column style={columnText}>
                {pageUrl && pageUrl !== "Not provided" ? (
                  <Link href={pageUrl} style={link}>
                    {pageUrl}
                  </Link>
                ) : (
                  "Not provided"
                )}
              </Column>
            </Row>
          </Section>

          <Text style={paragraph}>
            Please reach out to them within 24–48 hours.
          </Text>

          <Text style={paragraph}>Thanks,</Text>
          <Text style={paragraph}>Admin</Text>

          <Hr style={hr} />
          <Text style={footer}>Data Science Wizards | India</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default DemoDetails;

const main = {
  backgroundColor: "#ffffff",
  margin: 0,
  padding: 0,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "24px 16px 48px",
  maxWidth: "680px",
};

const logo = {
  margin: "0 auto 24px",
  display: "block",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#111111",
  margin: "0 0 14px",
};

const tableWrapper = {
  marginTop: "24px",
  border: "1px solid #f2f2f2",
  borderRadius: "8px",
  overflow: "hidden",
};

const row = {
  borderBottom: "1px solid #f2f2f2",
};

const lastRow = {};

const columnHead = {
  textAlign: "left",
  fontSize: "15px",
  lineHeight: "24px",
  fontWeight: "600",
  width: "160px",
  padding: "12px 16px",
  borderRight: "1px solid #f2f2f2",
  color: "#111111",
  backgroundColor: "#fafafa",
};

const columnText = {
  textAlign: "left",
  fontSize: "15px",
  lineHeight: "24px",
  padding: "12px 16px",
  color: "#6a6a6a",
  wordBreak: "break-word",
};

const link = {
  color: "#067df7",
  textDecoration: "underline",
  wordBreak: "break-word",
};

const hr = {
  borderColor: "#cccccc",
  margin: "24px 0 16px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "18px",
  margin: 0,
};