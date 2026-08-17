import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import uiReducer from "../../store/ui/uiSlice";
import ToastManager from "./ToastManager";

vi.mock("react-toastify", () => ({
  toast: vi.fn(),
  ToastContainer: () => null,
}));

type UIState = ReturnType<typeof uiReducer>;

function renderWithStore(ui: ReactElement, preloadedState?: { ui: UIState }) {
  const store = configureStore({
    reducer: { ui: uiReducer },
    preloadedState,
  });
  return { store, ...render(<Provider store={store}>{ui}</Provider>) };
}

describe("ToastManager", () => {
    it("dispatches clearToast after showing a toast", async () => {
		const { store } = renderWithStore(<ToastManager />, {
			ui: { toast: { type: "success", message: "Task saved" }, 
                loadingEntities: false, 
                loadedFirstTime: true
             },
		}); 
		expect(store.getState().ui.toast).toBe(null);
    });

	it("does not dispatch anything when there is no toast", () => {
	  const store = configureStore({
		reducer: { ui: uiReducer },
		preloadedState: { ui: { toast: null, loadingEntities: false, loadedFirstTime: true } },
	  });
	  const dispatchSpy = vi.spyOn(store, "dispatch");
	  render(
		<Provider store={store}>
		  <ToastManager />
		</Provider>
	  );
	  expect(dispatchSpy).not.toHaveBeenCalled();
	});

    it("uses the custom color when provided in the toast payload", () => {
        // Test implementation
    });
});