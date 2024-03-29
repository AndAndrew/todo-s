import {TasksStateType} from "../unusingElements/App";
import {addTaskAC, changeTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "./tasksReducer";
import {addTodoListAC, removeTodoListAC} from "./todoListReducer";

let startState: TasksStateType = {};

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", completed: false},
            {id: "2", title: "JS", completed: true},
            {id: "3", title: "React", completed: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", completed: false},
            {id: "2", title: "milk", completed: true},
            {id: "3", title: "tea", completed: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("todolistId2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", completed: false},
            {id: "2", title: "JS", completed: true},
            {id: "3", title: "React", completed: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", completed: false},
            {id: "3", title: "tea", completed: false}
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("todolistId2", "juce");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].completed).toBe(false);
});

test('status of specified task should be changed', () => {

    const action = changeTaskAC("todolistId2", "2", false);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].completed).toBe(false);
    expect(endState["todolistId1"][1].completed).toBe(true);
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "3", "coffee");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][2].title).toBe("coffee");
    expect(endState["todolistId1"][2].title).toBe("React");
});

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC("new todolist");

    const endState = tasksReducer(startState, action);


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});



