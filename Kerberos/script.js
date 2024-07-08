// database of users and services
const usersDb = {
    'user1': 'password1',
    'user2': 'password2'
};

const servicesDb = {
    'service1': 'service_key1',
    'service2': 'service_key2'
};

// key for TGS
const TGSKey = '123456';

let TGT = null;
let serviceTicket = null;

// Function to simulate hashing
function hash(data) {
    return btoa(data); // Using base64 for simplicity
}

// Function to generate a random ticket
function generateTicket() {
    return hash(Math.random().toString());
}

// Step 1: Client requests TGT
function requestTGT() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (usersDb[username] === password) {
        TGT = generateTicket();
        output(`Authentication Server: Issuing TGT for ${username}: ${TGT}`);
    } else {
        output('Authentication Server: Invalid credentials');
    }
}

// Step 2: Client requests Service Ticket using TGT
function requestServiceTicket() {
    const serviceName = document.getElementById('serviceName').value;

    if (TGT) {
        if (servicesDb[serviceName]) {
            serviceTicket = generateTicket();
            output(`Ticket-Granting Server: Issuing Service Ticket for ${serviceName}: ${serviceTicket}`);
        } else {
            output('Ticket-Granting Server: Unknown service');
        }
    } else {
        output('Ticket-Granting Server: Invalid TGT');
    }
}

// Step 3: Client accesses the service using the Service Ticket
function accessService() {
    const serviceName = document.getElementById('serviceName').value;

    if (serviceTicket) {
        output(`Service ${serviceName}: Access granted with Service Ticket: ${serviceTicket}`);
    } else {
        output(`Service ${serviceName}: Access denied`);
    }
}

function output(message) {
    document.getElementById('output').textContent += message + '\n';
}
