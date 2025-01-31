var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var moment = require('moment');

export var Todo = React.createClass({
  render: function() {
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';
    var renderDate = () => {
      var message = 'created at: ';
      var timestamp = createdAt;

      if(completed) {
        message = 'completed at: ';
        timestamp = completedAt;
      }
      return message + moment.unix(timestamp).format('MMM Do Y @ h:mm a');
    };
    return(
      <div className={todoClassName} onClick={() => {
          dispatch(actions.toggleTodo(id));
        }}>
        <div>
          <input type='checkbox' checked={completed}/>
        </div>
        <div>
          <p>{text}</p>
          <p className='todo__subtext'>{renderDate()}</p>
        </div>
     </div>
    );
  }
});

export default connect()(Todo);
