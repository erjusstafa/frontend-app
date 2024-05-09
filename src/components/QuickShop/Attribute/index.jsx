import{ Component } from 'react'
import PropTypes from "prop-types"; 
 class Attribute extends Component {
  render() {
    const { key, attribute } = this.props;

    return (
        <div key={key} className="atr-size">
        <div>
          <span>{attribute.name}</span>
          <div className="attributes-nested">
            {Array.isArray(attribute.items) &&
              attribute.items.map((it) => (
                <div
                  key={it.id}
                  className={`${
                    attribute.name === "Color"
                      ? "attributes-items color-box"
                      : " attributes-items"
                  }`}
                  style={{ backgroundColor: `${it.value}` }}
                >
                  <span onClick={() => alert(it.value)}>
                    {attribute.name !== "Color" && it.value}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}

Attribute.propTypes = {
    key: PropTypes.string,
    attribute: PropTypes.array,
  };
export default Attribute;