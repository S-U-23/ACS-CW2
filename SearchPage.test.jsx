import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchPage from '../components/SearchPage';

describe('SearchPage', () => {
  // Mock filter state to pass as props
  const mockFilters = {
    type: "Any",
    minPrice: "Any",
    maxPrice: "Any",
    minBedrooms: "Any",
    maxBedrooms: "Any",
    addedAfter: "",
    addedBefore: "",
    postcode: ""
  };

  // Dummy setters for props
  const setFilters = () => {};
  const searchTerm = "";
  const setSearchTerm = () => {};

  // Check that the main page heading renders
  it('renders the main heading', () => {
    render(
      <SearchPage
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={mockFilters}
        setFilters={setFilters}
      />
    );

    expect(screen.getByText(/search properties here/i)).toBeInTheDocument();
  });

  // Check that the filters section heading is present
  it('renders the secondary heading', () => {
    render(
      <SearchPage
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={mockFilters}
        setFilters={setFilters}
      />
    );

    expect(screen.getByText(/filters:/i)).toBeInTheDocument();
  });

  // Check that the Reset Filters button renders
  it('renders the reset filters button', () => {
    render(
      <SearchPage
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={mockFilters}
        setFilters={setFilters}
      />
    );

    expect(screen.getByText(/reset filters/i)).toBeInTheDocument();
  });

  // Check that Reset Filters button is clickable
  it('Reset Filters button is clickable', () => {
    render(
      <SearchPage
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={mockFilters}
        setFilters={setFilters}
      />
    );

    const resetButton = screen.getByText(/reset filters/i);
    fireEvent.click(resetButton);

    // Ensure button still exists after click
    expect(resetButton).toBeInTheDocument();
  });
});
