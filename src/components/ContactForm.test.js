import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent'

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);

    const header = screen.queryByText(/contact form/i)

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/contact form/i);
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstName= screen.getByLabelText(/first name/i)
    userEvent.type(firstName,'1234')

    const error = screen.getAllByTestId('error');

    expect(error).toHaveLength(1);
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const firstName= screen.getByLabelText(/first name/i)
    userEvent.type(firstName,'1')

    const email= screen.getByLabelText(/email/i)
    userEvent.type(email,'1') 

    const button = screen.getByRole("button")
    userEvent.click(button)

    const error = screen.getAllByTestId('error');

    expect(error).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName= screen.getByLabelText(/first name/i)
    userEvent.type(firstName,'12345')

    const lastName= screen.getByLabelText(/last name/i)
    userEvent.type(lastName,'1') 

    const button = screen.getByRole("button")
    userEvent.click(button)

    const error = screen.getAllByTestId('error');

    expect(error).toHaveLength(1);
})

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    
    const firstName= screen.getByLabelText(/first name/i)
    userEvent.type(firstName,'1')

    const lastName= screen.getByLabelText(/last name/i)
    userEvent.type(lastName,'1')

    const button = screen.getByRole("button")
    userEvent.click(button)

    const error = screen.getByText(/email must be a valid email address/i);

    expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const button = screen.getByRole("button")
    userEvent.click(button)

    const error = screen.getByText(/lastName is a required field/i);

    expect(error).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName= screen.getByLabelText(/first name/i)
    userEvent.type(firstName,'12345')

    const lastName= screen.getByLabelText(/last name/i)
    userEvent.type(lastName,'1') 

    const email= screen.getByLabelText(/email/i)
    userEvent.type(email,'1@1.com') 

    const button = screen.getByRole("button")
    userEvent.click(button)


    const firstnameDisplay = screen.queryByTestId('firstnameDisplay')
    const lastnameDisplay = screen.queryByTestId('lastnameDisplay')
    const emailDisplay = screen.queryByTestId('emailDisplay')
    const messageDisplay = screen.queryByTestId('messageDisplay')


    expect(firstnameDisplay).toBeInTheDocument()
    expect(lastnameDisplay).toBeInTheDocument()
    expect(emailDisplay).toBeInTheDocument()
    expect(messageDisplay).toBeNull()

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstName= screen.getByLabelText(/first name/i)
    userEvent.type(firstName,'12345')

    const lastName= screen.getByLabelText(/last name/i)
    userEvent.type(lastName,'1') 

    const email= screen.getByLabelText(/email/i)
    userEvent.type(email,'1@1.com') 

    const message= screen.getByLabelText(/message/i)
    userEvent.type(message,'im a message') 

    const button = screen.getByRole("button")
    userEvent.click(button)


    const firstnameDisplay = screen.queryByTestId('firstnameDisplay')
    const lastnameDisplay = screen.queryByTestId('lastnameDisplay')
    const emailDisplay = screen.queryByTestId('emailDisplay')
    const messageDisplay = screen.queryByTestId('messageDisplay')


    expect(firstnameDisplay).toBeInTheDocument()
    expect(lastnameDisplay).toBeInTheDocument()
    expect(emailDisplay).toBeInTheDocument()
    expect(messageDisplay).toBeInTheDocument()
})

