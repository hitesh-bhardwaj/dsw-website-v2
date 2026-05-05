import React from "react";
import { Body, Column, Container, Head, Hr, Html, Img, Link, Preview, Row, Section, Text } from "@react-email/components";

const WalkthroughDetails = ({ userName, userEmail, userDesignation, userCompany, userNumber, downloadedPdfName, pageUrl }) => {
  const data = [
    { label: "Name", value: userName },
    { label: "Email", value: userEmail, isEmail: true },
    { label: "Designation", value: userDesignation },
    { label: "Company", value: userCompany },
    { label: "Number", value: userNumber },
    ...(downloadedPdfName ? [{ label: "Downloaded PDF", value: downloadedPdfName }] : []),
    { label: "Submitted From", value: pageUrl, isLink: true },
  ];

  return (
    <Html>
      <Head />
      <Preview>Demo Walkthrough</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src="https://www.datasciencewizards.ai/assets/form-logo.png" width="140" height="80" alt="Logo" style={logo} />
          <Text style={paragraph}>Hello Team:</Text>
          <Text style={paragraph}>Please check the following user details for product walkthrough:</Text>
          <Section style={mainTable}>
            {data.map((item, index) => (
              <Row key={index}>
                <Column style={labelCell}><Text style={labelTextStyle}>{item.label}</Text></Column>
                <Column style={valueCell}>
                  {item.isEmail ? <Link href={`mailto:${item.value}`} style={linkStyle}>{item.value}</Link> : 
                   item.isLink ? <Link href={item.value} style={linkStyle}>{item.value}</Link> :
                   <Text style={valueTextStyle}>{item.value}</Text>}
                </Column>
              </Row>
            ))}
          </Section>
          <Text style={paragraph}>Thanks<br />- Admin</Text>
          <Hr style={hr} />
          <Text style={footer}>India</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WalkthroughDetails;

const main = { backgroundColor: "#ffffff", fontFamily: 'Arial, sans-serif' };
const container = { margin: "0 auto", padding: "20px", width: "580px" };
const logo = { margin: "0 auto 24px", display: "block" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#111", margin: "0 0 14px" };
const mainTable = { width: "100%", borderCollapse: "collapse", tableLayout: "fixed", border: "1px solid #eeeeee" };
const labelCell = { width: "150px", backgroundColor: "#fafafa", padding: "12px", borderBottom: "1px solid #eeeeee", borderRight: "1px solid #eeeeee" };
const valueCell = { width: "430px", padding: "12px", borderBottom: "1px solid #eeeeee", wordBreak: "break-all" };
const labelTextStyle = { margin: "0", fontSize: "14px", fontWeight: "bold" };
const valueTextStyle = { margin: "0", fontSize: "14px", color: "#6a6a6a" };
const linkStyle = { color: "#067df7", textDecoration: "underline" };
const hr = { borderColor: "#cccccc", margin: "24px 0 16px" };
const footer = { color: "#8898aa", fontSize: "12px" };