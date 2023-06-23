# Stepper

### Contents

1. [ Stepper ](#maincomponent)
2. [ StepperSidebar ](#steppersidebar)
3. [ StepperStage ](#stepperstage)
4. [ NavBar ](#navbar)
5. [ NavItem ](#navitem)
6. [ StepperContent ](#steppercontent)

<a name="maincomponent"></a>

## Stepper

Stepper component is the top level component, containing a StepperSidebar component and linked StepperContent component.

The StepperSidebar will keep track of which step you are currently viewing and the StepperContent will display the content for that particular step. You can use 'transitionButton' in StepperStage to navigate between the steps. Additional props can be set to handle backtracking to previous steps (if required).

### Usage

```js
import Stepper from '@cmc/stepper/esnext/Stepper';
```

### Properties

| propName                     | propType                            | defaultValue | isRequired | Description                                                                                           |
| ---------------------------- | ----------------------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------- |
| orientation                  | One of: ['left-side', 'right-side'] | 'left-side'  |            | Location of the `<NavBar />`                                                                          |
| activeStepIndex              | number                              | -            | +          | Set the current step ( Zero based index )                                                             |
| children                     | [StepperStage]                      | -            | +          | One or more `<StepperStage/>` components.                                                             |
| handleStep                   | func                                | -            | +          | Provide the ability to update activeStepIndex in the parent function to a certain index               |
| height                       | string                              | 100%         |            | A set PX height can be provided if needed                                                             |
| shouldNavBarUpdateOnScroll   | bool                                | true         |            | Determines whether we render a waypoint for each stage so we can update NavBar on scrolling over them |
| renderUpToLatestStageReached | bool                                | -            |            | Determines whether we should render just to activeIndex or latestStepReachedIndex                     |
| summaryStyle                 | string                              | -            |            | When the summary should be rendered                                                                   |

<a name="steppersidebar"></a>

## StepperSidebar

Acts as the navigation bar for the stepper, allows you to jump to previously completed steps, but not into future steps.

### Properties

| propName                  | propType | defaultValue | isRequired | Description                                                                             |
| ------------------------- | -------- | ------------ | ---------- | --------------------------------------------------------------------------------------- |
| activeStepIndex           | number   | -            | +          | Set the current step ( Zero based index )                                               |
| currentlyViewingStepIndex | number   | -            | +          | What stage we're currently viewing ( Zero based index )                                 |
| children                  | node     | -            | +          | One or more `<StepperStage/>` components.                                               |
| onClickPreviousStep       | func     | -            | +          | Provide the ability to update activeStepIndex in the parent function to a certain index |
| summaryStyle              | string   | -            |            | When the summary should be rendered                                                     |
| allowNavigation           | bool     | -            |            | Flag to indicate whether navigation is allowed from stepper stage or not.               |

<a name="stepperstage"></a>

## StepperStage

The `<Stepper/>` component handles drawing content / headers. This just provides a cleaner interface to construct <Stepper/>

In this component, you can also specify a 'transitionButton' prop which will be rendered and can handle step transition as required.

### Properties

| propName                   | propType                                 | defaultValue | isRequired | Description                                                                               |
| -------------------------- | ---------------------------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------- |
| title                      | string                                   | -            | +          | Primary title for this step                                                               |
| subtitle                   | string                                   | ''           |            | Show whats been completed in a previous step                                              |
| content                    | node                                     | -            | +          | Content for the current stage being rendered                                              |
| activeStepIndex            | number                                   | 0            | +          | Set the current step ( Zero based index )                                                 |
| stageType                  | One of: ['current', 'previous', 'later'] | 'current'    |            | Where abouts this step is located in relation to current                                  |
| stepIndex                  | number                                   | 0            |            | The index of this stage in relation to other `<StepperStage />`'s                         |
| onWaypointEnter            | func                                     | () => {}     |            | When we scroll this stage into view, this parent function will be called to update NavBar |
| onClickPreviousStep        | func                                     | () => {}     |            | Used to update our parent with a new activeStepID when we click on previous stages        |
| shouldNavBarUpdateOnScroll | bool                                     | true         |            | Helper function in `<Stepper/>` to scroll to a component given it's container ID          |
| shouldShowPageTitle        | bool                                     | false        |            | Should we show a title above this current stage content                                   |
| parentScrollContainer      | string                                   | ''           |            | The parent container within which the scrolling needs to happen.                          |
| allowNavigation            | bool                                     | -            |            | Flag to indicate whether navigation is allowed from stepper stage or not.                 |
| transitionButton           | Component                                | -            |            | Rendered component that is used to handle navigation from stepper stage                   |

<a name="navbar"></a>

## NavBar

NavBar component displays a collection NavItem components, for use with the Stepper.

### Properties

| propName        | propType | defaultValue | isRequired | Description                                                                 |
| --------------- | -------- | ------------ | ---------- | --------------------------------------------------------------------------- |
| activeStepIndex | number   | -            | +          | Used to tell the child items whether their content is currently being shown |
| children        | node     | -            | +          | Collection of NavItem's                                                     |

<a name="navitem"></a>

## NavItem

Individual nav item component used as part of the Stepper

### Properties

| propName        | propType                                          | defaultValue       | isRequired | Description                                                         |
| --------------- | ------------------------------------------------- | ------------------ | ---------- | ------------------------------------------------------------------- |
| title           | string                                            | -                  | +          | Primary title for this step                                         |
| onClick         | func                                              | -                  |            | Called when we click anywhere in nav item                           |
| subtitle        | One of: string, element                           | ''                 |            | Description about whats required from the step                      |
| summary         | One of: string, element                           | ''                 |            | Show whats been completed in a previous step                        |
| isActive        | bool                                              | -                  | +          | Whether we're currently displaying the content for this step        |
| isComplete      | bool                                              | true               |            | Has this stage already been completed                               |
| currIndex       | number                                            | -                  | +          | The current index we've reached up to                               |
| summaryStyle    | One of: ['real-time', 'after-completion', 'hide'] | 'after-completion' |            | See below                                                           |
| allowNavigation | bool                                              | -                  |            | Determines when the stepper should allow to move to a previous step |

#### Summary Style

It will display the summary of the step as follow:

- real-time: always visible
- after-completion: only when the step is completed
- hide: never visible

<a name="steppercontent"></a>

## StepperContent

The actual content for the related StepperStage

### Properties

| propName                     | propType | defaultValue | isRequired | Description                                                                                           |
| ---------------------------- | -------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------- |
| activeStepIndex              | number   | -            | +          | Set the current step ( Zero based index )                                                             |
| latestStepReachedIndex       | number   | -            | +          | The latest stage we've reached up to                                                                  |
| children                     | node     | -            | +          | One or more `<StepperStage/>` components.                                                             |
| shouldNavBarUpdateOnScroll   | bool     | -            | +          | Determines whether we render a waypoint for each stage so we can update NavBar on scrolling over them |
| onClickPreviousStep          | func     | -            | +          | Used to update our parent with a new activeStepID when we click on previous stages                    |
| onWaypointEnter              | func     | -            | +          | When we scroll this stage into view, this parent function will be called to update NavBar             |
| renderUpToLatestStageReached | bool     | -            | +          | Determines whether we should render just to activeIndex or latestStepReachedIndex                     |
