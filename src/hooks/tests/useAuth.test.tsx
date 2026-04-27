import { renderHook, act } from "@testing-library/react";
import type { User } from "firebase/auth";
import useAuth from "../useAuth";

const { onAuthStateChangedMock, unsubscribeMock } = vi.hoisted(() => ({
  onAuthStateChangedMock: vi.fn(),
  unsubscribeMock: vi.fn(),
}));

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: onAuthStateChangedMock,
}));

vi.mock("@services/firebase", () => ({
  auth: { _tag: "auth" },
}));

beforeEach(() => {
  onAuthStateChangedMock.mockReset();
  unsubscribeMock.mockReset();
  onAuthStateChangedMock.mockReturnValue(unsubscribeMock);
});

describe("useAuth", () => {
  it("starts loading with no user", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current).toEqual({ user: null, isLoading: true });
  });

  it("subscribes to onAuthStateChanged once on mount, with the auth instance", () => {
    renderHook(() => useAuth());

    expect(onAuthStateChangedMock).toHaveBeenCalledTimes(1);
    expect(onAuthStateChangedMock).toHaveBeenCalledWith(
      expect.objectContaining({ _tag: "auth" }),
      expect.any(Function),
    );
  });

  it("clears loading and stays unauthenticated when the listener fires with null", () => {
    const { result } = renderHook(() => useAuth());

    const callback = onAuthStateChangedMock.mock.calls[0]?.[1] as (u: User | null) => void;
    act(() => callback(null));

    expect(result.current).toEqual({ user: null, isLoading: false });
  });

  it("populates user and clears loading when the listener fires with a User", () => {
    const { result } = renderHook(() => useAuth());

    const fakeUser = { uid: "u-1", email: "a@b.com" } as User;
    const callback = onAuthStateChangedMock.mock.calls[0]?.[1] as (u: User | null) => void;
    act(() => callback(fakeUser));

    expect(result.current).toEqual({ user: fakeUser, isLoading: false });
  });

  it("unsubscribes on unmount", () => {
    const { unmount } = renderHook(() => useAuth());

    expect(unsubscribeMock).not.toHaveBeenCalled();
    unmount();
    expect(unsubscribeMock).toHaveBeenCalledTimes(1);
  });
});
