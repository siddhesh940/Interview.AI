"use client";

// This file exports client-only components that receive callback props.
// These are used by parent client components, not server components.
/* eslint-disable react/jsx-sort-props */

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check, ChevronDown, ChevronUp, Edit2, Plus, Save, Trash2, X } from "lucide-react";
import { useCallback, useState } from "react";

// Define local UI types for the user correction components
export interface UISkill {
  id: string;
  name: string;
  category: string;
  confidence: number;
  userVerified?: boolean;
}

export interface UIExperience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  confidence: number;
  userVerified?: boolean;
}

export interface UIEducation {
  id: string;
  degree: string;
  institution: string;
  year: string;
  score: string;
  level: string;
  confidence: number;
  userVerified?: boolean;
}

export interface UIProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  confidence: number;
  userVerified?: boolean;
}

// Utility to generate unique IDs
const generateId = () => `item_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

/**
 * Editable Skills Section
 */
interface EditableSkillsProps {
  skills: UISkill[];
  onSave: (skills: UISkill[]) => void;
  confidenceMessage: string;
}

export function EditableSkills({ skills, onSave, confidenceMessage }: EditableSkillsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [editedSkills, setEditedSkills] = useState<UISkill[]>(skills);
  const [newSkill, setNewSkill] = useState("");
  const [newCategory, setNewCategory] = useState<string>("technical");

  const handleAddSkill = useCallback(() => {
    if (newSkill.trim()) {
      setEditedSkills([
        ...editedSkills,
        {
          id: generateId(),
          name: newSkill.trim(),
          category: newCategory,
          confidence: 1.0,
          userVerified: true
        }
      ]);
      setNewSkill("");
    }
  }, [newSkill, newCategory, editedSkills]);

  const handleRemoveSkill = useCallback((id: string) => {
    setEditedSkills(editedSkills.filter(s => s.id !== id));
  }, [editedSkills]);

  const handleSave = useCallback(() => {
    onSave(editedSkills);
    setIsEditing(false);
  }, [editedSkills, onSave]);

  const handleCancel = useCallback(() => {
    setEditedSkills(skills);
    setIsEditing(false);
  }, [skills]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "programming": return "bg-blue-100 text-blue-800";
      case "framework": return "bg-purple-100 text-purple-800";
      case "database": return "bg-green-100 text-green-800";
      case "tool": return "bg-amber-100 text-amber-800";
      case "cloud": return "bg-cyan-100 text-cyan-800";
      case "soft": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <button 
            type="button"
            className="flex items-center gap-2 hover:opacity-80"
            onClick={() => setIsOpen(!isOpen)}
          >
            <CardTitle className="text-base">Skills ({editedSkills.length})</CardTitle>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-1" /> Edit
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{confidenceMessage}</p>
      </CardHeader>
      {isOpen && (
        <CardContent>
          {editedSkills.length === 0 && !isEditing && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700 text-sm">
                We couldn&apos;t confidently detect skills. Click &quot;Edit&quot; to add your skills manually.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex flex-wrap gap-2">
            {editedSkills.map((skill) => (
              <Badge 
                key={skill.id}
                className={`${getCategoryColor(skill.category)} ${
                  skill.confidence < 0.7 ? 'opacity-70 border-dashed border' : ''
                } ${isEditing ? 'pr-1' : ''}`}
              >
                {skill.name}
                {skill.userVerified && <Check className="h-3 w-3 ml-1" />}
                {isEditing && (
                  <button 
                    type="button"
                    className="ml-1 p-0.5 hover:bg-red-200 rounded"
                    onClick={() => handleRemoveSkill(skill.id)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>

          {isEditing && (
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                className="flex-1"
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="framework">Framework</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="tool">Tool</SelectItem>
                  <SelectItem value="cloud">Cloud</SelectItem>
                  <SelectItem value="soft">Soft Skill</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

/**
 * Editable Experience Section
 */
interface EditableExperienceProps {
  experience: UIExperience[];
  onSave: (experience: UIExperience[]) => void;
  confidenceMessage: string;
}

export function EditableExperience({ experience, onSave, confidenceMessage }: EditableExperienceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [editedExperience, setEditedExperience] = useState<UIExperience[]>(experience);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExperience, setNewExperience] = useState<Partial<UIExperience>>({});

  const handleAddExperience = useCallback(() => {
    if (newExperience.title || newExperience.company) {
      setEditedExperience([
        ...editedExperience,
        {
          id: generateId(),
          title: newExperience.title || "Position",
          company: newExperience.company || "Company",
          duration: newExperience.duration || "",
          description: newExperience.description || "",
          confidence: 1.0,
          userVerified: true
        }
      ]);
      setNewExperience({});
      setShowAddForm(false);
    }
  }, [newExperience, editedExperience]);

  const handleRemoveExperience = useCallback((id: string) => {
    setEditedExperience(editedExperience.filter(e => e.id !== id));
  }, [editedExperience]);

  const handleUpdateField = useCallback((id: string, field: keyof UIExperience, value: string) => {
    setEditedExperience(editedExperience.map(exp => 
      exp.id === id ? { ...exp, [field]: value, userVerified: true } : exp
    ));
  }, [editedExperience]);

  const handleSave = useCallback(() => {
    onSave(editedExperience);
    setIsEditing(false);
    setShowAddForm(false);
  }, [editedExperience, onSave]);

  const handleCancel = useCallback(() => {
    setEditedExperience(experience);
    setIsEditing(false);
    setShowAddForm(false);
  }, [experience]);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <button 
            type="button"
            className="flex items-center gap-2 hover:opacity-80"
            onClick={() => setIsOpen(!isOpen)}
          >
            <CardTitle className="text-base">Experience ({editedExperience.length})</CardTitle>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-1" /> Edit
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{confidenceMessage}</p>
      </CardHeader>
      {isOpen && (
        <CardContent className="space-y-4">
          {editedExperience.length === 0 && !isEditing && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700 text-sm">
                We couldn&apos;t confidently detect work experience. Click &quot;Edit&quot; to add your experience manually.
              </AlertDescription>
            </Alert>
          )}

          {editedExperience.map((exp) => (
            <div 
              key={exp.id} 
              className={`p-3 border rounded-lg ${
                exp.confidence < 0.7 ? 'border-dashed border-amber-300 bg-amber-50' : 'bg-gray-50'
              }`}
            >
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={exp.title}
                      onChange={(e) => handleUpdateField(exp.id, 'title', e.target.value)}
                      placeholder="Job Title"
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={exp.company}
                    onChange={(e) => handleUpdateField(exp.id, 'company', e.target.value)}
                    placeholder="Company"
                  />
                  <Input
                    value={exp.duration}
                    onChange={(e) => handleUpdateField(exp.id, 'duration', e.target.value)}
                    placeholder="Duration (e.g., Jan 2020 - Present)"
                  />
                  <Textarea
                    value={exp.description}
                    onChange={(e) => handleUpdateField(exp.id, 'description', e.target.value)}
                    placeholder="Description"
                    rows={2}
                  />
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{exp.title}</h4>
                    {exp.userVerified && (
                      <Badge variant="outline" className="text-xs">
                        <Check className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                  {exp.duration && (
                    <p className="text-xs text-gray-500">{exp.duration}</p>
                  )}
                  {exp.description && (
                    <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {isEditing && (
            <>
              {showAddForm ? (
                <div className="p-3 border-2 border-dashed border-green-300 rounded-lg bg-green-50 space-y-2">
                  <Input
                    value={newExperience.title || ''}
                    onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                    placeholder="Job Title"
                  />
                  <Input
                    value={newExperience.company || ''}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    placeholder="Company"
                  />
                  <Input
                    value={newExperience.duration || ''}
                    onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                    placeholder="Duration"
                  />
                  <Textarea
                    value={newExperience.description || ''}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    placeholder="Description"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddExperience}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full border-dashed"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Experience
                </Button>
              )}
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}

/**
 * Editable Education Section
 */
interface EditableEducationProps {
  education: UIEducation[];
  onSave: (education: UIEducation[]) => void;
  confidenceMessage: string;
}

export function EditableEducation({ education, onSave, confidenceMessage }: EditableEducationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [editedEducation, setEditedEducation] = useState<UIEducation[]>(education);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEducation, setNewEducation] = useState<Partial<UIEducation>>({});

  const handleAddEducation = useCallback(() => {
    if (newEducation.institution || newEducation.degree) {
      setEditedEducation([
        ...editedEducation,
        {
          id: generateId(),
          degree: newEducation.degree || "Degree",
          institution: newEducation.institution || "Institution",
          year: newEducation.year || "",
          score: newEducation.score || "",
          level: newEducation.level || "bachelor",
          confidence: 1.0,
          userVerified: true
        }
      ]);
      setNewEducation({});
      setShowAddForm(false);
    }
  }, [newEducation, editedEducation]);

  const handleRemoveEducation = useCallback((id: string) => {
    setEditedEducation(editedEducation.filter(e => e.id !== id));
  }, [editedEducation]);

  const handleUpdateField = useCallback((id: string, field: keyof UIEducation, value: string) => {
    setEditedEducation(editedEducation.map(edu => 
      edu.id === id ? { ...edu, [field]: value, userVerified: true } : edu
    ));
  }, [editedEducation]);

  const handleSave = useCallback(() => {
    onSave(editedEducation);
    setIsEditing(false);
    setShowAddForm(false);
  }, [editedEducation, onSave]);

  const handleCancel = useCallback(() => {
    setEditedEducation(education);
    setIsEditing(false);
    setShowAddForm(false);
  }, [education]);

  const getLevelBadgeColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'phd': return 'bg-purple-100 text-purple-800';
      case 'masters': return 'bg-blue-100 text-blue-800';
      case 'graduation': case 'bachelor': return 'bg-green-100 text-green-800';
      case 'diploma': return 'bg-cyan-100 text-cyan-800';
      case 'hsc': return 'bg-amber-100 text-amber-800';
      case 'ssc': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <button 
            type="button"
            className="flex items-center gap-2 hover:opacity-80"
            onClick={() => setIsOpen(!isOpen)}
          >
            <CardTitle className="text-base">Education ({editedEducation.length})</CardTitle>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-1" /> Edit
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{confidenceMessage}</p>
      </CardHeader>
      {isOpen && (
        <CardContent className="space-y-4">
          {editedEducation.length === 0 && !isEditing && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700 text-sm">
                We couldn&apos;t confidently detect education. Click &quot;Edit&quot; to add your education details manually.
              </AlertDescription>
            </Alert>
          )}

          {editedEducation.map((edu) => (
            <div 
              key={edu.id} 
              className={`p-3 border rounded-lg ${
                edu.confidence < 0.7 ? 'border-dashed border-amber-300 bg-amber-50' : 'bg-gray-50'
              }`}
            >
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={edu.degree}
                      onChange={(e) => handleUpdateField(edu.id, 'degree', e.target.value)}
                      placeholder="Degree"
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={edu.institution}
                    onChange={(e) => handleUpdateField(edu.id, 'institution', e.target.value)}
                    placeholder="Institution"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={edu.year}
                      onChange={(e) => handleUpdateField(edu.id, 'year', e.target.value)}
                      placeholder="Year (e.g., 2020)"
                      className="w-32"
                    />
                    <Input
                      value={edu.score}
                      onChange={(e) => handleUpdateField(edu.id, 'score', e.target.value)}
                      placeholder="Score/GPA"
                      className="flex-1"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <div className="flex items-center gap-2">
                      {edu.level && (
                        <Badge className={`text-xs ${getLevelBadgeColor(edu.level)}`}>
                          {edu.level.toUpperCase()}
                        </Badge>
                      )}
                      {edu.userVerified && (
                        <Badge variant="outline" className="text-xs">
                          <Check className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                    {edu.year && <span>Year: {edu.year}</span>}
                    {edu.score && <span>Score: {edu.score}</span>}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isEditing && (
            <>
              {showAddForm ? (
                <div className="p-3 border-2 border-dashed border-green-300 rounded-lg bg-green-50 space-y-2">
                  <Input
                    value={newEducation.degree || ''}
                    onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    placeholder="Degree (e.g., B.Tech in Computer Science)"
                  />
                  <Input
                    value={newEducation.institution || ''}
                    onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                    placeholder="Institution"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={newEducation.year || ''}
                      onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                      placeholder="Year"
                      className="w-32"
                    />
                    <Input
                      value={newEducation.score || ''}
                      onChange={(e) => setNewEducation({ ...newEducation, score: e.target.value })}
                      placeholder="Score/GPA"
                      className="flex-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddEducation}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full border-dashed"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
              )}
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}

/**
 * Editable Projects Section
 */
interface EditableProjectsProps {
  projects: UIProject[];
  onSave: (projects: UIProject[]) => void;
  confidenceMessage: string;
}

export function EditableProjects({ projects, onSave, confidenceMessage }: EditableProjectsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [editedProjects, setEditedProjects] = useState<UIProject[]>(projects);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState<Partial<UIProject>>({});
  const [newTech, setNewTech] = useState("");

  const handleAddProject = useCallback(() => {
    if (newProject.name) {
      setEditedProjects([
        ...editedProjects,
        {
          id: generateId(),
          name: newProject.name,
          description: newProject.description || "",
          technologies: newProject.technologies || [],
          confidence: 1.0,
          userVerified: true
        }
      ]);
      setNewProject({});
      setShowAddForm(false);
    }
  }, [newProject, editedProjects]);

  const handleRemoveProject = useCallback((id: string) => {
    setEditedProjects(editedProjects.filter(p => p.id !== id));
  }, [editedProjects]);

  const handleUpdateField = useCallback((id: string, field: keyof UIProject, value: string | string[]) => {
    setEditedProjects(editedProjects.map(proj => 
      proj.id === id ? { ...proj, [field]: value, userVerified: true } : proj
    ));
  }, [editedProjects]);

  const handleAddTechToProject = useCallback((id: string, tech: string) => {
    if (tech.trim()) {
      const project = editedProjects.find(p => p.id === id);
      if (project) {
        handleUpdateField(id, 'technologies', [...project.technologies, tech.trim()]);
      }
    }
  }, [editedProjects, handleUpdateField]);

  const handleRemoveTechFromProject = useCallback((projId: string, techIndex: number) => {
    const project = editedProjects.find(p => p.id === projId);
    if (project) {
      handleUpdateField(projId, 'technologies', 
        project.technologies.filter((_, i) => i !== techIndex)
      );
    }
  }, [editedProjects, handleUpdateField]);

  const handleSave = useCallback(() => {
    onSave(editedProjects);
    setIsEditing(false);
    setShowAddForm(false);
  }, [editedProjects, onSave]);

  const handleCancel = useCallback(() => {
    setEditedProjects(projects);
    setIsEditing(false);
    setShowAddForm(false);
  }, [projects]);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <button 
            type="button"
            className="flex items-center gap-2 hover:opacity-80"
            onClick={() => setIsOpen(!isOpen)}
          >
            <CardTitle className="text-base">Projects ({editedProjects.length})</CardTitle>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-1" /> Edit
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{confidenceMessage}</p>
      </CardHeader>
      {isOpen && (
        <CardContent className="space-y-4">
          {editedProjects.length === 0 && !isEditing && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700 text-sm">
                We couldn&apos;t confidently detect projects. Click &quot;Edit&quot; to add your projects manually.
              </AlertDescription>
            </Alert>
          )}

          {editedProjects.map((proj) => (
            <div 
              key={proj.id} 
              className={`p-3 border rounded-lg ${
                proj.confidence < 0.7 ? 'border-dashed border-amber-300 bg-amber-50' : 'bg-gray-50'
              }`}
            >
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={proj.name}
                      onChange={(e) => handleUpdateField(proj.id, 'name', e.target.value)}
                      placeholder="Project Name"
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveProject(proj.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={proj.description}
                    onChange={(e) => handleUpdateField(proj.id, 'description', e.target.value)}
                    placeholder="Description"
                    rows={2}
                  />
                  <div>
                    <p className="text-xs font-medium mb-1">Technologies:</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {proj.technologies.map((tech, techIdx) => (
                        <Badge key={`${proj.id}-tech-${tech}`} variant="secondary" className="pr-1">
                          {tech}
                          <button 
                            type="button"
                            onClick={() => handleRemoveTechFromProject(proj.id, techIdx)}
                            className="ml-1 hover:bg-red-200 rounded"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology..."
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddTechToProject(proj.id, newTech);
                            setNewTech('');
                          }
                        }}
                        className="flex-1 h-8 text-sm"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          handleAddTechToProject(proj.id, newTech);
                          setNewTech('');
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{proj.name}</h4>
                    {proj.userVerified && (
                      <Badge variant="outline" className="text-xs">
                        <Check className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                  )}
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.technologies.map((tech) => (
                        <Badge key={`${proj.id}-${tech}`} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isEditing && (
            <>
              {showAddForm ? (
                <div className="p-3 border-2 border-dashed border-green-300 rounded-lg bg-green-50 space-y-2">
                  <Input
                    value={newProject.name || ''}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Project Name"
                  />
                  <Textarea
                    value={newProject.description || ''}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Description"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddProject}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full border-dashed"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Project
                </Button>
              )}
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}
