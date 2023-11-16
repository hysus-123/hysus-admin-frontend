import React from 'react'
import { Container } from '@mui/material'

const NonCompetence = () => {
  return (
    <div>
        <Container>
            <div style={{ fontFamily: 'poppins' }}>
                <h1 style={{ textAlign: 'center', textDecoration: 'underline' }}>Non-Compete Agreement</h1>
                <h3>1. Non-Compete Restriction:</h3>
                <p>During the term of employment with the Company and for a period of 1 Year after the termination of employment, the Employee agrees not to engage in the following activities.</p>
                <h3>2. Restricted Activities:</h3>
                <p>The Employee shall not, directly or indirectly, engage in the following activities:</p>
                <p>a. Employment or Consultation: The Employee shall not work for or provide services to a business engaged in activities similar to or in competition with Hysus Digital Pvt. Ltd.</p>
                <p> b. Ownership Interest: The Employee shall not own, manage, operate, or have a financial interest in any business engaged in activities similar to or in competition with Hysus Digital Pvt. Ltd.</p>
                <p>   c. Solicitation of Clients/Customers: The Employee shall not directly or indirectly solicit or attempt to solicit the business of any client or customer of Hysus Digital Pvt. Ltd.</p>
                <p>d. Solicitation of Employees: The Employee shall not directly or indirectly solicit or attempt to solicit the employment of any employee of Hysus Digital Pvt. Ltd.</p>
                <p>e. Use of Confidential Information: The Employee shall not use or disclose the Company's trade secrets, proprietary information, or confidential business information for their benefit or the benefit of any other entity.</p>
                <p>f. Development of Similar Products/Services: The Employee shall not engage in the development, production, or sale of products or services that are similar to those offered by Hysus Digital Pvt. Ltd.</p>

                <h3>3. Consideration:</h3>
                <p>In consideration for the non-compete undertaking, the Employee acknowledges [Specify Consideration, e.g., continued employment, access to proprietary information].</p>

                <h3>4. Governing Law:</h3>
                <p>This Agreement shall be governed by and construed in accordance with the laws Jurisdiction of Haryana, India.</p>
                <p>IN WITNESS WHEREOF, the Parties hereto have executed this Non-Compete Agreement as of the date first above written.</p>
                <p>The enforceability of non-compete clauses in India is governed by the Indian Contract Act, of 1872. Violation of this Non-Compete Agreement may result in legal action, including injunctive relief and monetary damages. The Employee may be held liable for breach of contract, and the Company may pursue appropriate legal remedies to protect its interests.</p>
            </div>
        </Container>
    </div>
  )
}

export default NonCompetence
