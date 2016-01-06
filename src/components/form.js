import React from 'react'

export const FormGroup = ({error=false, inputType="text", htmlFor="", labelClass="", placeholder=""}) => {
	const inputClass = !!error ? "form-control error" : "form-control"
	const $errorLabel = !!error.message ? error.message : null 

	return (
		<div className="form-group">
			<label htmlFor={htmlFor} className={labelClass + "control-label col-lg-2"}></label>
			<div className="col-lg-10">
				<input type={inputType} className={inputClass} placeholder={placeholder}/>
				{$errorLabel}
			</div>
		</div>
	)
}