from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import send_file 
import io
import mysql.connector
import os
import hashlib
from werkzeug.utils import secure_filename
import base64

app = Flask(__name__)
CORS(app)

# Configure MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="home_service_db"
)
cursor = db.cursor()

@app.route('/login', methods=['POST'])
def login():
    # Get email and password from the request JSON
    user_data = request.get_json()
    email = user_data.get('email')
    password = user_data.get('password')

    # Query the database for the user
    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()

    # Check if the user exists
    if user:
        # Return success response
        return jsonify({'success': True})
    else:
        # Return failure response with message
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/servicelogin', methods=['POST'])
def servicelogin():
    # Get email and password from the request JSON
    user_data = request.get_json()
    email = user_data.get('email')
    password = user_data.get('password')

    # Query the database for the user
    cursor.execute("SELECT * FROM service_provid WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()

    # Check if the user exists
    if user:
        # Return success response
        return jsonify({'success': True})
    else:
        # Return failure response with message
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    
@app.route('/signup', methods=['POST'])
def signup():
    # Get user data from the request body
    user_data = request.get_json()

    # Extract user details
    name = user_data.get('name')
    email = user_data.get('email')
    password = user_data.get('password')

    # Insert user data into the database
    insert_query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
    cursor.execute(insert_query, (name, email, password))
    db.commit()

    return jsonify({'message': 'User registered successfully'})

@app.route('/sp/signup', methods=['POST'])
def spsignup():
    # Get service provider data from the request form
    provider_data = request.form

    # Extract provider details
    provider_name = provider_data.get('name')
    email = provider_data.get('email')
    password = provider_data.get('password')
    company_name = provider_data.get('company')
    service_area = provider_data.get('serviceArea')
    contact_number = provider_data.get('number')
    COW = provider_data.get('category')
    # Get the uploaded proof ID (document) and profile picture
    proof_id = request.files['document'] if 'document' in request.files else None
    profile_picture = request.files['picture'] if 'picture' in request.files else None
    # Save the proof ID (document) and profile picture as binary data
    proof_id_data = None
    profile_picture_data = None
    if proof_id:
        proof_id_data = proof_id.read()
    if profile_picture:
        profile_picture_data = profile_picture.read()

    # Insert provider data into the database
    insert_query = "INSERT INTO service_provid (name, company, email, password, service_area, proof_id, profile_picture, contact_number, COW) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(insert_query, (provider_name, company_name, email, password, service_area, proof_id_data, profile_picture_data, contact_number, COW))
    db.commit()

    return jsonify({'message': 'Service provider registered successfully'})
    
def fetch_service_providers():
    try:
        cursor.execute("SELECT * FROM service_provid")
        service_providers = cursor.fetchall()
        return service_providers
    except mysql.connector.Error as error:
        print("Error fetching data:", error)
        return []

@app.route('/api/service-providers', methods=['GET'])
def get_service_providers():
    service_providers = fetch_service_providers()
    providers_list = []
    for provider in service_providers:
        provider_data = {
            'id': provider[0],
            'name': provider[1],
            'company': provider[2],
            'email': provider[3],
            'contact_number': provider[8],
            'COW': provider[9]
        }
        providers_list.append(provider_data)
    
    return jsonify({'serviceProviders': providers_list})

@app.route('/to_store_message', methods=['POST'])
def store_message():
    # Get message data from the request body
    message_data = request.get_json()
    requester_email = message_data.get('requester_email')
    service_provider_id = message_data.get('service_provider_id')
    service_provider_email = message_data.get('service_provider_email')
    message = message_data.get('message')

    # Insert message data into the database
    insert_query = "INSERT INTO requests (requester_email, service_provider_id, service_provider_email, message_1, status) VALUES (%s, %s, %s, %s, 'pending')"
    cursor.execute(insert_query, (requester_email, service_provider_id, service_provider_email, message))
    db.commit()

    return jsonify({'message': 'Message stored successfully'})

@app.route('/get_notifications', methods=['GET'])
def get_notifications():
    requester_email = request.args.get('requester_email')

    # Query the database to fetch notifications for the requester_email
    query = "SELECT request_id, message_1, message_2, status, created_at, updated_at, service_provider_id, service_provider_email FROM requests WHERE requester_email = %s"
    cursor.execute(query, (requester_email,))
    requests = cursor.fetchall()

    print("Requests retrieved:", requests)  # Add this line to print the retrieved requests

    return jsonify(requests)

@app.route('/get_requests', methods=['GET'])
def get_requests():
    try:
        service_provider_email = request.args.get('service_provider_email')
        print("Service Provider Email:", service_provider_email)  # Debugging statement

        # Query the database to fetch requests for the service_provider_email
        query = "SELECT request_id, message_1, message_2, status, created_at, updated_at, requester_email FROM requests WHERE service_provider_email = %s"
        cursor.execute(query, (service_provider_email,))
        requested = cursor.fetchall()

        print("Requests retrieved:", requested)  # Debugging statement

        return jsonify(requested)
    except Exception as e:
        print("Error fetching requests:", e)  # Print error for debugging
        return jsonify({'error': 'Failed to fetch requests'}), 500  # Return error response with status code 500

@app.route('/get_provider_details', methods=['GET'])
def get_provider_details():
    email = request.args.get('email')

    # Query the database to fetch provider details for the given email
    query = "SELECT * FROM service_provid WHERE email = %s"
    cursor.execute(query, (email,))
    provider = cursor.fetchone()

    if provider:
        provider_details = {
            'id': provider[0],
            'name': provider[1],
            'company': provider[2],
            'email': provider[3],
            'contact_number': provider[8],
            'COW': provider[9],
            'Location': provider[5],
            'password': provider[4]
        }
        return jsonify(provider_details)
    else:
        return jsonify({'message': 'Provider not found'})
    
@app.route('/update_service_area', methods=['POST'])
def update_service_area():
    # Get data from the request body
    user_email = request.form.get('user_email')
    new_location = request.form.get('new_location')

    # Update the service_area for the user with the specified email
    query = "UPDATE service_provid SET service_area = %s WHERE email = %s"
    cursor.execute(query, (new_location, user_email))
    db.commit()

    return jsonify({'message': 'Service area updated successfully'})

@app.route('/update_request', methods=['POST'])
def update_request():
    try:
        # Get data from the request JSON
        data = request.get_json()

        # Extract data
        request_id = data.get('requestId')
        message = data.get('message', '')  # Acceptance message is optional
        status = data['status']

        # Update request in the database
        if status in ['accepted', 'rejected']:
            # Define the update query based on the status
            if status == 'accepted':
                update_query = "UPDATE requests SET status = %s, message_2 = %s WHERE request_id = %s"
                cursor.execute(update_query, (status, message, request_id))
            else:
                update_query = "UPDATE requests SET status = %s WHERE request_id = %s"
                cursor.execute(update_query, (status, request_id))
            
            # Commit the changes to the database
            db.commit()

            return jsonify({'message': 'Request updated successfully'})
        else:
            return jsonify({'error': 'Invalid status provided'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
if __name__ == '__main__':
    app.run(port=5005, debug=True)
