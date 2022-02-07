import PropTypes from "react";

const ContactItem = ({ contact }) => {
  const { id, name, email, phone, type } = contact;
  return (
    <div>
      <h3>
        {name}{" "}
        <span
        span={{ float: 'right'}}
         className={'text-color '+
            (type === "professional" ? "success" : "primary")
          }
        >{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </h3>
      <ul>
          { email && (<li>
              <i className="fas fa-envelope-open"></i> {email}
          </li>)}
          { phone && (<li>
              <i className="fas fa-phone"></i> {phone}
          </li>)}
      </ul>
      <p>
          <button>Edit</button>
          <button>Delete</button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
    // contact: PropTypes.object.isRequired
}

export default ContactItem;
