import React from 'react';
import { Container } from '@mui/material';

const NonDisclosure = () => {
  return (
    <div>
      <Container>
      <div style={{ fontFamily: 'poppins' }}>
                        <h1 style={{ textAlign: 'center', textDecoration: 'underline' }}>Non-Disclosure Agreement</h1>
                        <h3>Confidential Information:</h3>
                        <p>The Company may disclose confidential information to the Employee, including but not limited to proprietary software, client lists, business plans, and trade secrets (collectively referred to as Our confidential information includes proprietary software, client details, business strategies, financial data, and trade secrets. Unauthorized disclosure or use is strictly prohibited to safeguard our intellectual property and business interests.</p>
                        <h3>Obligations:</h3>
                        <p>The Employee agrees to keep all Confidential Information confidential and not to disclose, reproduce, or use such information for any purpose other than the performance of their duties for the Company.</p>
                        <h3>Duration:</h3>
                        <p>The confidentiality obligations shall survive the termination of the Employee's engagement with the Company and continue for a period of 1 year from the date of disclosure.</p>
                        <h3>Return or Destruction of Information:</h3>
                        <p>Upon the Company's request or the termination of the Employee's engagement, the Employee shall promptly return or destroy all materials containing Confidential Information.</p>

                        <h3>Governing Law:</h3>
                        <p>This Agreement shall be governed by and construed in accordance with the laws of India.</p>
                        <p>In Witness Whereof, the Parties hereto have executed this Non-Disclosure Agreement as of the date first above written.</p>
                        <p>Indian Contract Act, 1872. Potential consequences may include Violation of a Non-Disclosure Agreement, which may lead to legal consequences, including court-ordered injunctions, monetary damages, and potential criminal charges. The aggrieved party may pursue legal remedies specified in the agreement and under applicable laws to safeguard confidential information.</p>
        </div>
      </Container>
    </div>
  );
}

export default NonDisclosure;
