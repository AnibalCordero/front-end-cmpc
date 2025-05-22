import { AppLayout } from "@/components/AppLayout";
import { Login } from "@/features/auth/pages/Login";
import { BookList } from "@/features/book/pages/BookList";
import { CreateBook } from "@/features/book/pages/CreateBook";
import { EditBook } from "@/features/book/pages/EditBook";
import type { JSX } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/books"
        element={
          <PrivateRoute>
            <AppLayout>
              <BookList />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/books/create"
        element={
          <PrivateRoute>
            <AppLayout>
              <CreateBook />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/books/:id/edit"
        element={
          <PrivateRoute>
            <AppLayout>
              <EditBook />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/books" />} />
    </Routes>
  </BrowserRouter>
);
