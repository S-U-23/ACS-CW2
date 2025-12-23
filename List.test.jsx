import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import List from '../components/List';

// Sample data to test List rendering
const sampleProperties = [
  {
    id: "prop1",
    type: "House",
    price: 750000,
    location: "Petts Wood Road, Petts Wood, Orpington BR5",
  },
  {
    id: "prop2",
    type: "Flat",
    price: 399995,
    location: "Crofton Road Orpington BR6",
  },
];

describe('List component', () => {

  // Test 1: Ensure List renders property items correctly
  it('renders property items when provided', () => {
    render(
      <List
        items={sampleProperties}
        renderItem={(prop) => (
          <div>
            <h4>{prop.type} - £{prop.price.toLocaleString()}</h4>
            <p>{prop.location}</p>
          </div>
        )}
        emptyMessage="No properties found"
      />
    );

    // Check that each property is rendered with correct type and price
    expect(screen.getByText('House - £750,000')).toBeInTheDocument();
    expect(screen.getByText('Flat - £399,995')).toBeInTheDocument();
  });

  // Test 2: Ensure List displays empty message when no items are provided
  it('shows empty message when no properties', () => {
    render(
      <List
        items={[]} // Pass empty array to simulate no properties
        renderItem={(prop) => <div>{prop.type}</div>}
        emptyMessage="No properties found"
      />
    );

    // Check that the empty message is displayed
    expect(screen.getByText('No properties found')).toBeInTheDocument();
  });
});
