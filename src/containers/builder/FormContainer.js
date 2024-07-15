import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as FieldListActions from "../../actions/fieldlist";
import * as ServerActions from "../../actions/server";
import Form from "../../app/routes/merchandising/builder/Form";
import EditableField from "../../app/routes/merchandising/builder/EditableField";
import TitleField from "../../app/routes/merchandising/builder/TitleField";
import DescriptionField from "../../app/routes/merchandising/builder/DescriptionField";

function mapStateToProps(state) {
  console.log(state)
  return {
    error: state.form.error,
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData,
    status: state.serverStatus.status,
    dragndropStatus: state.dragndrop.dragndropStatus
  };
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {...FieldListActions, ...ServerActions};
  const actions = bindActionCreators(actionCreators, dispatch);
  // Side effect: attaching action creators as EditableField props, so they're
  // available from within the Form fields hierarchy.
  EditableField.defaultProps = Object.assign(
    {}, EditableField.defaultProps || {}, actions);
  TitleField.defaultProps = Object.assign(
    {}, TitleField.defaultProps || {}, actions);
  DescriptionField.defaultProps = Object.assign(
    {}, DescriptionField.defaultProps || {}, actions);
  return actions;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    SchemaField: EditableField,
    TitleField,
    DescriptionField,
    onChange: () => {}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Form);
