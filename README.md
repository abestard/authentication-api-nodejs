# Authentication api ( NodeJs )

# Endpoints:
*	POST /register
	*	request
		*	email
		*	username
		*	password
	*	response
		*	status
		*	data
		*	info
		
*	POST /validate
	*	request
		*	token
		*	email
	*	response
		*	status
		*	info	
		
*	POST /login
	*	request
		*	username
		*	password
	*	response
		*	status
		*	info
		*	data
		*	jwt
