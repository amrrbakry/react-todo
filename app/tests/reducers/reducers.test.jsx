var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');

describe('reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'Dog'
      };
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toBe(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        text: 'walk the dog'
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
    });

    it('should toggle todo', () => {
      var todos = [{
        id: 123,
        text: 'something',
        completed: true,
        createdAt: 123,
        completedAt: 125
      }];
      var action = {
        type: 'TOGGLE_TODO',
        id: 123
      };
      var res = reducers.todosReducer(df(todos), df(action));

      expect(res[0].completed).toBe(false);
      expect(res[0].completedAt).toBe(undefined);
    });

    it('should add existing todos', () => {
      var todos = [{
        id: 123,
        text: 'something',
        completed: true,
        createdAt: 123,
        completedAt: 125
      }];
      var action = {
        type: 'ADD_TODOS',
        todos
      };
      var res = reducers.todosReducer(df([]), df(action))

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(todos[0]);
    });
  });
});
