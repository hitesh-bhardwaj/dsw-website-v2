import React from "react";
import { Html, Head, Body, Container, Text, Section, Row, Column, Link, Preview, Img, Hr } from "@react-email/components";

export default function DownloadPdfDetails({ userName, userEmail, userDesignation, userCompany, userNumber, downloadedPdfName, pageUrl }) {
  const data = [
    { label: "Name", value: userName },
    { label: "Email", value: userEmail },
    { label: "Company", value: userCompany },
    { label: "Designation", value: userDesignation },
    { label: "Phone", value: userNumber },
    { label: "Downloaded", value: downloadedPdfName },
    { label: "Page", value: pageUrl, isLink: true },
  ];

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img src="https://www.datasciencewizards.ai/assets/form-logo.png" width="140" height="80" alt="Logo" style={logo} />
          <Text style={paragraph}>New PDF Download Lead</Text>
          <Section style={mainTable}>
            {data.map((item, index) => (
              <Row key={index}>
                <Column style={labelCell}><Text style={labelTextStyle}>{item.label}</Text></Column>
                <Column style={valueCell}>
                  {item.isLink ? <Link href={item.value} style={linkStyle}>{item.value}</Link> : <Text style={valueTextStyle}>{item.value}</Text>}
                </Column>
              </Row>
            ))}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#ffffff", fontFamily: 'Arial, sans-serif' };
const container = { margin: "0 auto", padding: "20px", width: "580px" };
const logo = { margin: "0 auto 20px", display: "block" };
const paragraph = { fontSize: "16px", fontWeight: "bold", marginBottom: "15px" };
const mainTable = { width: "100%", borderCollapse: "collapse", tableLayout: "fixed", border: "1px solid #eeeeee" };
const labelCell = { width: "150px", backgroundColor: "#fafafa", padding: "12px", borderBottom: "1px solid #eeeeee", borderRight: "1px solid #eeeeee" };
const valueCell = { width: "430px", padding: "12px", borderBottom: "1px solid #eeeeee", wordBreak: "break-all" };
const labelTextStyle = { margin: "0", fontSize: "14px", fontWeight: "bold" };
const valueTextStyle = { margin: "0", fontSize: "14px", color: "#555" };
const linkStyle = { color: "#067df7", textDecoration: "none", fontSize: "14px" };