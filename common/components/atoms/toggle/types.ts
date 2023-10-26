export type ToggleProps = {
  /** The checked state of the toggle */
  checked: boolean
  /** The onChange handler of the toggle */
  onChange: () => void
  /** The custom color of the toggle */
  customColor?: string
  /** The cypress data-cy attribute */
  "data-cy"?: string
}
