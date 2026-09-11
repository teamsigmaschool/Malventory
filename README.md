# Malventory (Malfunctioning Inventory)

<img width="526" height="472" alt="Screenshot 2026-09-11 143213" src="https://github.com/user-attachments/assets/be616188-b879-40d5-b2d8-b49a7729bd41" />

This is the final working solution code.

---

## The bugs in the bugged version:

### 1. Syntax Bug
* **Location:** `InventoryRow.jsx`
* **The Bug:** Removed a closing bracket `)` or brace `}` from the JSX.
* **Result:** **Vite compiler error**. The build fails immediately and points directly to the broken file and line number.
* **Lesson:** Read the compiler error carefully. Trace your matching brackets and resolve all syntax errors before expecting the application to run.

### 2. Runtime Red-Screen Bug
* **Location:** `InventoryRow.jsx`
* **The Bug:** Attempted to read a property from an undefined value (e.g., accessing `item.stock.quantity` when `stock` is undefined).
* **Result:** **Vite's red error overlay** triggers at runtime.
* **Lesson:** Runtime errors occur after the code successfully parses. Inspect the specific variable or property named in the crash report and verify the data structure at that exact line.

### 3. Logical Bug
* **Location:** `Use one` button handler.
* **The Bug:** Used `+ 1` instead of `- 1` when adjusting stock.
* **Result:** **Incorrect app behavior**. The stock increases when a user records an item as being used, but no error is thrown.
* **Lesson:** Code that runs without throwing an error can still be broken. Always test the actual business logic and outcome of user actions, not just whether the console is clear.

### 4. Import Error
* **Location:** Component import statement.
* **The Bug:** Misspelled the `InventoryRow` import path or filename.
* **Result:** **Module resolution failure**. Vite halts execution because it cannot find the file.
* **Lesson:** Double-check your file system. Verify the import path, actual filename, export type (default vs. named), and case sensitivity.

### 5. useRef Bug
* **Location:** "New item" focus handler.
* **The Bug:** Changed `itemNameInputRef.current.focus()` to `itemNameInputRef.focus()`.
* **Result:** **Runtime crash**. Clicking "New item" throws an error because the ref wrapper object does not have a `.focus()` method.
* **Lesson:** React references hold the actual DOM node inside the `.current` property. You must target `.current` to interact with the underlying DOM element.

### 6. useEffect Cleanup Bug
* **Location:** `StockWatch.jsx`
* **The Bug:** Removed `clearInterval(intervalId)` from the `useEffect` return statement.
* **Result:** **Memory leak / Timer stacking**. Pausing and restarting Stock Watch repeatedly causes the scan count to increase exponentially because stale intervals continue running in the background.
* **Lesson:** Any side-effect that initializes a timer, subscription, or event listener must return a cleanup function to clear resources when the component unmounts or updates.
