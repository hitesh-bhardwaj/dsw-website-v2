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

  const data = [
    { label: "Name", value: userName },
    { label: "Email", value: userEmail, isEmail: true },
    { label: "Designation", value: userDesignation },
    { label: "Company", value: userCompany },
    { label: "Phone Number", value: userNumber },
    { label: "Submitted From", value: pageUrl, isLink: true },
  ];

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ textAlign: "center" }}>
            <Img
              src="https://www.datasciencewizards.ai/assets/form-logo.png"
              width="140"
              height="80"
              alt="DSW Logo"
              style={logo}
            />
          </Section>

          <Text style={paragraph}>Hi Team,</Text>
          <Text style={paragraph}>
            You have received a new demo request. Please find the details below:
          </Text>

          {/* SINGLE RIGID TABLE STRUCTURE */}
          <Section style={mainTable}>
            {data.map((item, index) => (
              <Row key={index}>
                <Column style={labelCell}>
                  <Text style={labelTextStyle}>{item.label}</Text>
                </Column>
                <Column style={valueCell}>
                  {item.isEmail ? (
                    <Link href={`mailto:${item.value}`} style={linkStyle}>
                      {item.value}
                    </Link>
                  ) : item.isLink && item.value && item.value !== "Not provided" ? (
                    <Link href={item.value} style={linkStyle}>
                      {item.value}
                    </Link>
                  ) : (
                    <Text style={valueTextStyle}>{item.value || "Not provided"}</Text>
                  )}
                </Column>
              </Row>
            ))}
          </Section>

          <Text style={{ ...paragraph, marginTop: "24px" }}>
            Please reach out to them within 24–48 hours.
          </Text>

          <Text style={paragraph}>
            Thanks,<br />Admin
          </Text>

          <Hr style={hr} />
          <Text style={footer}>Data Science Wizards | India</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default DemoDetails;

// --- STYLES ---

const main = {
  backgroundColor: "#ffffff",
  fontFamily: 'Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "24px 16px 48px",
  width: "580px", // Fixed width for Outlook consistency
};

const logo = {
  margin: "0 auto 24px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#111111",
  margin: "0 0 10px",
};

const mainTable = {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",
  border: "1px solid #eeeeee",
};

const labelCell = {
  width: "150px",
  backgroundColor: "#fafafa",
  padding: "12px 16px",
  borderBottom: "1px solid #eeeeee",
  borderRight: "1px solid #eeeeee",
  verticalAlign: "middle",
};

const valueCell = {
  width: "430px",
  padding: "12px 16px",
  borderBottom: "1px solid #eeeeee",
  verticalAlign: "middle",
  wordBreak: "break-all",
};

const labelTextStyle = {
  margin: "0",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#111111",
};

const valueTextStyle = {
  margin: "0",
  fontSize: "14px",
  color: "#6a6a6a",
  lineHeight: "20px",
};

const linkStyle = {
  color: "#067df7",
  textDecoration: "underline",
  fontSize: "14px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "24px 0 16px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};