import { Card } from "@/components";
import { API } from "@/services/api";
import { useEffect, useState } from "react";

export default function DashboardCategoryPage() {   
  const [categories, setCategories] = useState([]); 

  useEffect(() => { 
    fetch(`${API}/categories`)
      .then((data) => data.json())
      .then((data) => setCategories(data.results))
  }, [])

  return (
    <div>
      <h1 className="text-2xl">Categories</h1>
      <Card className="flex flex-col gap-2">  
        {categories.map((cat) => ( 
          <div key={cat.id} >
            <span>{cat.name}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}