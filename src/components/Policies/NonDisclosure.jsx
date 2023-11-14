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
        </div>
      </Container>
    </div>
  );
}

export default NonDisclosure;
