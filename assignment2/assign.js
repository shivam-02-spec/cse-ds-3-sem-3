        const statusBox = document.getElementById('status');

        const events = {
            login: 'Student logged successfully',
            assign: 'Assignment submitted',
            logout: 'Student logged out',
            exit: 'Existing application'
        };

        function triggerEvent(eventName) {
            const message = events[eventName];
            statusBox.textContent = message;
            console.log(message);
        }

        document.getElementById('loginBtn').addEventListener('click', function () {
            triggerEvent('login');
        });

        document.getElementById('assignBtn').addEventListener('click', function () {
            triggerEvent('assign');
        });

        document.getElementById('logoutBtn').addEventListener('click', function () {
            triggerEvent('logout');
        });

        document.getElementById('exitBtn').addEventListener('click', function () {
            triggerEvent('exit');
        });
    