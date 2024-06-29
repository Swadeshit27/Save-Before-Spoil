
import axios from 'axios'
import { Button } from 'flowbite-react'
import React from 'react'

const SendEmail = () => {
  const sendEmail = async () => {
    const email = "swadeshpal129@gmail.com"
    const subject = "Recipe products list"
    const message = `
    <h2 style="text-align: center;">Product Table</h2>
    <table border="1" style="width: 60%; margin: auto; border-collapse: collapse; text-align: center;">
        <thead>
            <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px;">Product Name</th>
                <th style="padding: 10px;">Price</th>
                <th style="padding: 10px;">Days Left to Expire</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="padding: 10px;">Product 1</td>
                <td style="padding: 10px;">$10.00</td>
                <td style="padding: 10px;">30</td>
            </tr>
            <tr>
                <td style="padding: 10px;">Product 2</td>
                <td style="padding: 10px;">$15.50</td>
                <td style="padding: 10px;">45</td>
            </tr>
            <tr>
                <td style="padding: 10px;">Product 3</td>
                <td style="padding: 10px;">$7.25</td>
                <td style="padding: 10px;">20</td>
            </tr>
        </tbody>
    </table>
      <div style="width: 60%; margin: 20px auto; text-align: center;">
        <p style="font-size: 18px;">Recipes that can be made using these products:</p>
        <ul style="list-style-type: none; padding: 0; font-size: 16px;">
            <li style="padding: 5px;">Recipe 1: Example Dish 1</li>
            <li style="padding: 5px;">Recipe 2: Example Dish 2</li>
            <li style="padding: 5px;">Recipe 3: Example Dish 3</li>
        </ul>
    </div>

    <div style="width: 60%; margin: 20px auto; text-align: center;">
        <p style="font-size: 18px;">Total Amount to be Paid: <strong>$32.75</strong></p>
        <button style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Proceed to Payment</button>
    </div>
    `
    try {
      const { data } = await axios.post('http://localhost:8080/send-email', { email, subject, message })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Button onClick={sendEmail}>Send Email</Button>
    </div>
  )
}

export default SendEmail
