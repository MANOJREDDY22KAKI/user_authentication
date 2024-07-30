document.addEventListener('DOMContentLoaded', () => {
    const formTitle = document.getElementById('form-title');
    const authent = document.getElementById('loginform');
    const switchBtn = document.getElementById('register');
    let isLogin = true;

    // Event listener for switching between login and register
    switchBtn.addEventListener('click', () => {
        isLogin = !isLogin;
        if (isLogin) {
            formTitle.textContent = 'Login';
            switchBtn.textContent = 'Switch to Register';
        } else {
            formTitle.textContent = 'Register';
            switchBtn.textContent = 'Switch to Login';
        }
    });

    // Event listener for form submission
    authent.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const url = isLogin ? 'http://localhost:5000/users/login' : 'http://localhost:5000/users/register';
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
    
            // Check if response is JSON
            const contentType = response.headers.get('Content-Type');
            console.log('Content type:', contentType);
            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();

                
            } else {
                // Handle non-JSON responses
                data = { message: await response.text() };
            }
    
            console.log('Response status:', response.status);
            console.log('Response data:', data);
    
            if (response.ok) {
                // Redirect to home page
                window.location.href = 'home.html';
                
                // Create and display a welcome message
                const idx = email.indexOf('@');
                const displayName = document.createElement('p');
                displayName.classList.add('text-lg', 'text-gray-700', 'mt-4', 'mb-4', 'font-bold');
                const name = email.substring(0, idx);
                displayName.textContent = `Welcome, ${name}`;
                
                // Append the welcome message to the body (or a specific container)
                document.body.appendChild(displayName);
            } else {
                // Handle errors
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('An error occurred:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    });
    
});