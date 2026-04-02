// components/emailTemplate/DownloadPdfDetails.jsx

import React from "react";
import {
  Html, Head, Body, Container, Text, Section, Row, Column, Link
} from "@react-email/components";

export default function DownloadPdfDetails({
  userName,
  userEmail,
  userDesignation,
  userCompany,
  userNumber,
  downloadedPdfName,
  pageUrl,
}) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text>New PDF Download Lead</Text>

          <Section>
            <Row>
              <Column>Name</Column>
              <Column>{userName}</Column>
            </Row>

            <Row>
              <Column>Email</Column>
              <Column>{userEmail}</Column>
            </Row>

            <Row>
              <Column>Company</Column>
              <Column>{userCompany}</Column>
            </Row>

            <Row>
              <Column>Designation</Column>
              <Column>{userDesignation}</Column>
            </Row>

            <Row>
              <Column>Phone</Column>
              <Column>{userNumber}</Column>
            </Row>

            <Row>
              <Column>Downloaded</Column>
              <Column>{downloadedPdfName}</Column>
            </Row>

            <Row>
              <Column>Page</Column>
              <Column>
                <Link href={pageUrl}>{pageUrl}</Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}