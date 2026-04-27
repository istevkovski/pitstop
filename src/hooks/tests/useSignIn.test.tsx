import { renderHook, act } from "@testing-library/react";
import useSignIn from "../useSignIn";

const {
  signInWithEmailAndPasswordMock,
  signInWithPopupMock,
  GoogleAuthProviderMock,
  navigateMock,
  useLocationMock,
} = vi.hoisted(() => ({
  signInWithEmailAndPasswordMock: vi.fn(),
  signInWithPopupMock: vi.fn(),
  GoogleAuthProviderMock: vi.fn(),
  navigateMock: vi.fn(),
  useLocationMock: vi.fn(),
}));

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
  signInWithPopup: signInWithPopupMock,
  GoogleAuthProvider: GoogleAuthProviderMock,
}));

vi.mock("@services/firebase", () => ({
  auth: { _tag: "auth" },
}));

vi.mock("react-router", () => ({
  useNavigate: () => navigateMock,
  useLocation: () => useLocationMock(),
}));

beforeEach(() => {
  signInWithEmailAndPasswordMock.mockReset();
  signInWithPopupMock.mockReset();
  GoogleAuthProviderMock.mockReset();
  navigateMock.mockReset();
  useLocationMock.mockReset();
  useLocationMock.mockReturnValue({ state: null });
});

describe("useSignIn", () => {
  it("starts with no error and not submitting", () => {
    const { result } = renderHook(() => useSignIn());

    expect(result.current.error).toBe(null);
    expect(result.current.isSubmitting).toBe(false);
  });

  describe("signIn (email/password)", () => {
    it("calls signInWithEmailAndPassword with the auth instance and credentials", async () => {
      signInWithEmailAndPasswordMock.mockResolvedValue({});
      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.signIn("a@b.com", "pw");
      });

      expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
        expect.objectContaining({ _tag: "auth" }),
        "a@b.com",
        "pw",
      );
    });

    it("navigates to / on success when no `from` is provided", async () => {
      signInWithEmailAndPasswordMock.mockResolvedValue({});
      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.signIn("a@b.com", "pw");
      });

      expect(navigateMock).toHaveBeenCalledWith("/", { replace: true });
    });

    it("redirects to location.state.from.pathname when present", async () => {
      useLocationMock.mockReturnValue({ state: { from: { pathname: "/vehicles" } } });
      signInWithEmailAndPasswordMock.mockResolvedValue({});
      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.signIn("a@b.com", "pw");
      });

      expect(navigateMock).toHaveBeenCalledWith("/vehicles", { replace: true });
    });

    it("flips isSubmitting true while the action is in flight", async () => {
      let resolveAction: () => void = () => {};
      signInWithEmailAndPasswordMock.mockImplementation(
        () => new Promise<void>((resolve) => { resolveAction = resolve; }),
      );

      const { result } = renderHook(() => useSignIn());

      act(() => {
        void result.current.signIn("a@b.com", "pw");
      });

      expect(result.current.isSubmitting).toBe(true);
      expect(result.current.error).toBe(null);

      await act(async () => {
        resolveAction();
      });
    });

    it("sets error and clears isSubmitting on failure, without navigating", async () => {
      signInWithEmailAndPasswordMock.mockRejectedValue(new Error("Invalid credentials"));
      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.signIn("a@b.com", "pw");
      });

      expect(result.current.error).toBe("Invalid credentials");
      expect(result.current.isSubmitting).toBe(false);
      expect(navigateMock).not.toHaveBeenCalled();
    });

    it("falls back to a generic error message when the rejection isn't an Error", async () => {
      signInWithEmailAndPasswordMock.mockRejectedValue("string rejection");
      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.signIn("a@b.com", "pw");
      });

      expect(result.current.error).toBe("Sign in failed");
    });

    it("clears a previous error on the next attempt", async () => {
      signInWithEmailAndPasswordMock.mockRejectedValueOnce(new Error("Invalid credentials"));
      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.signIn("a@b.com", "wrong");
      });
      expect(result.current.error).toBe("Invalid credentials");

      signInWithEmailAndPasswordMock.mockResolvedValueOnce({});
      await act(async () => {
        await result.current.signIn("a@b.com", "right");
      });

      expect(result.current.error).toBe(null);
    });
  });

  describe("signInWithGoogle", () => {
    it("calls signInWithPopup with the auth instance and a GoogleAuthProvider instance", async () => {
      signInWithPopupMock.mockResolvedValue({});
      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.signInWithGoogle();
      });

      expect(GoogleAuthProviderMock).toHaveBeenCalledTimes(1);
      expect(signInWithPopupMock).toHaveBeenCalledWith(
        expect.objectContaining({ _tag: "auth" }),
        expect.any(Object),
      );
    });

    it("navigates to / on success", async () => {
      signInWithPopupMock.mockResolvedValue({});
      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.signInWithGoogle();
      });

      expect(navigateMock).toHaveBeenCalledWith("/", { replace: true });
    });

    it("sets error on failure, without navigating", async () => {
      signInWithPopupMock.mockRejectedValue(new Error("Popup blocked"));
      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.signInWithGoogle();
      });

      expect(result.current.error).toBe("Popup blocked");
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});
