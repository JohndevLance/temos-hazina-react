import React from "react";

import FormActionsContainer from "../../../../containers/builder/FormActionsContainer";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

import Form  from 'react-jsonschema-form';

export default function Form2(props) {
  console.log(props)
  const {error, dragndropStatus} = props;
  console.log(SchemaField.defaultProps)
  const registry = {
    ...SchemaField.defaultProps.registry,
    fields: {
      // ...SchemaField.defaultProps.registry.fields,
      SchemaField: props.SchemaField,
      TitleField: props.TitleField,
      DescriptionField: props.DescriptionField,
    }
  };

  console.log(registry)

  return (
    <div>
      {error ? <div className="alert alert-danger">{error}</div> : <div/>}
      <div className="rjsf builder-form">
        <SchemaField {...props} registry={registry} />
      </div>

      <FormActionsContainer {...props}/>
    </div>
  );
}
