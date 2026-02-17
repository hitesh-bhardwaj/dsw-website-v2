import React from "react";
import { Body, Column, Container, Head, Hr, Html, Img, Link, Preview, Row, Section, Text } from "@react-email/components";

const WorkshopDetails = ({ userName, userEmail, userDesignation, userCompany, userNumber, userTerms, pageUrl }) => {

  return (
    <Html>
      <Head />
      <Preview>
        Someone just filled Workshop Details on DSW Website.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={"https://www.datasciencewizards.ai/assets/images/form-logo.png"}
            width="140"
            height="80"
            alt="Logo"
            style={logo}
          />
          <Text style={paragraph}>Hi Team,</Text>
          <Text style={paragraph}>
            We have a new workshop form submission on the DSW website.
            <br />
            Below are the details.
          </Text>
          <Section>
            <Row style={row}>
              <Column style={columnHead}>Name</Column>
              <Column style={columnText}>{userName}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnHead}>Email</Column>
              <Column style={{ ...columnText, textDecoration: "underline", color: "#067df7" }}>{userEmail}</Column>
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
              <Column style={columnHead}>Number</Column>
              <Column style={columnText}>{userNumber}</Column>
            </Row>
            {/* <Row style={row}>
              <Column style={columnHead}>Terms</Column>
              <Column style={columnText}>{userTerms}</Column>
            </Row> */}
            
          </Section>

          <Text style={paragraph}>- Team DSW</Text>
          <Hr style={hr} />
          <Text style={footer}>This form is submitted from the page - <Link href={pageUrl}>{pageUrl}</Link></Text>
          <Text style={footer}>India</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WorkshopDetails;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const row = {
  borderLeft: "1px solid #f2f2f2",
  borderRight: "1px solid #f2f2f2",
  borderTop: "1px solid #f2f2f2",
};

const columnHead = {
  textAlign: "left",
  fontSize: "16px",
  lineHeight: "26px",
  fontWeight: "500",
  width: "120px",
  padding: "10px 15px",
  borderRight: "1px solid #f2f2f2",
};

const columnText = {
  textAlign: "left",
  fontSize: "15px",
  lineHeight: "26px",
  padding: "10px 15px",
  color: "#6a6a6a",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};